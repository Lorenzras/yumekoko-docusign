
/* eslint-disable max-len */
import {EnvelopesApi} from 'docusign-esign';
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
    let results;

    if (data.envelopeId) {
      console.log('Already have envelope Id');
      const {status} = await getEnvelope(accountId, data.envelopeId);
      console.log('Status is', status);
      if (status === 'sent') throw new Error('Can not modify sent data');
      results = await updateDocuments({
        envelope,
        envelopeId: data.envelopeId,
      });
    } else {
      results = await envelopesApi.createEnvelope(
        accountId,
        {
          envelopeDefinition: envelope,
        },
      );
      await setEnvelopeId(projId, data.envelopeId);
    }


    return {
      ...results,
      accountId,
    };
  } catch (err: any) {
    return {error: err.message};
  }
};
