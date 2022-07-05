
/* eslint-disable max-len */
import {EnvelopesApi, EnvelopeSummary} from 'docusign-esign';
import {getAccountId} from '../authentication/fetchUserInfo';
import {apiClient} from '../../config';
import {makeUkeoiEnvelope} from './makeUkeoiEnvelope';
import {getUkeoiData} from './getUkeoiData';
import {getEnvelope} from '../../api/docusign/getEnvelope';
import {updateDocuments} from '../../api/docusign/updateDocuments';
import {setEnvelopeId} from '../../api/kintone/setEnvelopeId';

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
) => {
  try {
    const accountId = await getAccountId();
    const data = await getUkeoiData(projId);
    const envelopesApi = new EnvelopesApi(apiClient);
    const envelope = await makeUkeoiEnvelope(data, status);
    let results: EnvelopeSummary;

    if (data.envelopeId) {
      console.log(`Already have envelope Id. ${data.envelopeId} Updating...`);
      const envelopeSummary = await getEnvelope(accountId, data.envelopeId);
      const {status} = envelopeSummary;
      console.log('Status is', status);
      results = envelopeSummary;

      // Can't modify documents that are already sent.
      if (status !== 'sent') {
        await updateDocuments({
          envelope,
          envelopeId: data.envelopeId,
        });
      }
    } else {
      // If envelope does not exist, create it.
      results = await envelopesApi.createEnvelope(
        accountId,
        {
          envelopeDefinition: envelope,
        },
      );

      if (results.envelopeId) {
        await setEnvelopeId(projId, results.envelopeId);
      }
    }


    return {
      ...results,
      accountId,
    };
  } catch (err: any) {
    return {error: err.message};
  }
};
