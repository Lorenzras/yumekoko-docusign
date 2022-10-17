import {EnvelopesApi, EnvelopeSummary} from 'docusign-esign';
import {apiClient} from '../../../../config';
import {getContractData} from '../../../kintone/getContractData';
import {updateEstimateEnvelope} from '../../../kintone/updateEstimateEnvelope';
import {getAccountId} from '../../authentication';
import {makeEnvelope} from './makeEnvelope';

export const processContract = async (
  params: ReqSendContract,
  status: 'created' | 'sent' = 'sent',
) => {
  try {
    const accountId = await getAccountId();

    const data = await getContractData(params, true);

    const envelopesApi = new EnvelopesApi(apiClient);

    const envelope = await makeEnvelope(
      data,
      status,
      params.signMethod,
    );

    let envSummary: EnvelopeSummary = Object.create(null);
    let envDocFileKeys: string[] = [];

    if (data.envelopeId) throw new Error(`エンヴェロープはもう存在しています。リロードして解決出来なかったら、お手数ですが、管理者にご連絡ください。 ${data.envelopeId}`);

    console.log('Creating envelope.');
    envSummary = await envelopesApi.createEnvelope(
      accountId,
      {
        envelopeDefinition: envelope,
      },
    );

    console.log('Envelope created.');

    if (envSummary.envelopeId && envelope.documents?.length) {
      console.log(`Updating projEstimateId. ${data.projEstimateId}`);
      const {envelopeId, status} = envSummary;
      await updateEstimateEnvelope({
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
        projEstimateId: data.projEstimateId,
      });
      console.log(`Done updating midumori. ${data.projEstimateId}`);
      envDocFileKeys = envelope
        .documents?.map((d) => d.documentBase64 ?? '') ?? [];
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
