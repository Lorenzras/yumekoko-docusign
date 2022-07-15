
/* eslint-disable max-len */
import {EnvelopesApi, EnvelopeSummary} from 'docusign-esign';
import {getAccountId} from '../authentication/fetchUserInfo';
import {apiClient} from '../../config';
import {makeUkeoiEnvelope} from './makeUkeoiEnvelope';
import {getUkeoiData} from './getUkeoiData';
import {getEnvelope} from '../../api/docusign/getEnvelope';
import {updateDocuments} from '../../api/docusign/updateDocuments';
import {updateProject} from '../../api/kintone/updateProject';


/**
 * Creates or updates envelope of the defined project Id
 *
 * @param projId The project where to base envelope's update and create methods
 * @param status https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/recipients/
 * @returns {EnvelopeSummary} Envelope summary and account id.
 */
export const processUkeoi = async (
  projId: string,
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

    if (data.envelopeId) throw new Error(`Envelope already exist. ${data.envelopeId}`);

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
    return {
      accountId,
      error: err.message,
    };
  }
};
