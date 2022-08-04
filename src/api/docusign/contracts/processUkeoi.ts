
/* eslint-disable max-len */
import {EnvelopesApi, EnvelopeSummary} from 'docusign-esign';
import {getAccountId} from '../authentication/fetchUserInfo';

import {makeUkeoiEnvelope} from './makeUkeoiEnvelope';
import {getUkeoiData} from './getUkeoiData';
import {apiClient} from '../../../config';
import {updateProject} from '../../kintone/updateProject';


/**
 * Creates or Send envelope of the defined project Id
 *
 * @param projId The project where to base envelope's update and create methods
 * @param custGroupId the link customer projectId,
 * @param status https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/recipients/
 * @returns {EnvelopeSummary} Envelope summary and account id.
 */
export const processUkeoi = async (
  projId: string,
  custGroupId: string,
  status: 'created' | 'sent' = 'sent',
) : Promise<{
  envelopeSummary?: EnvelopeSummary,
  documents?: string[],
  accountId: string,
  error?: string
}> => {
  let accountId = '';
  try {
    accountId = await getAccountId();
    const data = await getUkeoiData(projId);
    const envelopesApi = new EnvelopesApi(apiClient);
    const envelope = await makeUkeoiEnvelope(data, status);
    let envSummary: EnvelopeSummary = Object.create(null);
    let envDocFileKeys: string[] = [];


    if (data.envelopeId) throw new Error(`エンヴェロープはもう存在しています。リロードして解決出来なかったら、お手数ですが、管理者にご連絡ください。 ${data.envelopeId}`);
    if (!data.custEmail) throw new Error('顧客のメールアドレスは無効です。確認してください。');

    console.log('Creating envelope.');
    // If envelope does not exist, create it.
    envSummary = await envelopesApi.createEnvelope(
      accountId,
      {
        envelopeDefinition: envelope,
      },
    );

    console.log('Envelope created.');

    if (envSummary.envelopeId && envelope.documents?.length) {
      console.log(`Updating project. ${projId}`);
      const {envelopeId, status} = envSummary;
      await updateProject({
        envelopeId: envelopeId,
        envelopeStatus: status ?? 'sent',
        event: 'envelope-sent',
        documents: envelope.documents?.map(({documentBase64, name}) => {
          return {
            fileBase64: documentBase64 || '',
            filename: name || '',
          };
        }),
        recipients: [],
        projId: projId,
        custGroupId: custGroupId,
      });
      console.log(`Done updating project. ${projId}`);
      envDocFileKeys = envelope.documents?.map((d) => d.documentBase64 ?? '') ?? [];
    }


    return {
      envelopeSummary: envSummary,
      documents: envDocFileKeys,
      accountId,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};
