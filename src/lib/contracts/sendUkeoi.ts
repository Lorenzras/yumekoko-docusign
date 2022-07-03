
/* eslint-disable max-len */
import {EnvelopesApi} from 'docusign-esign';
import {getAccountId} from '../authentication/fetchUserInfo';
import {apiClient} from '../../config';
import {makeUkeoiEnvelope} from './makeUkeoiEnvelope';
import {getUkeoiData} from './getUkeoiData';

export const sendUkeoi = async (
  projId: string,
  status: 'created' | 'sent' = 'sent',
) => {
  const accountId = await getAccountId();
  const data = await getUkeoiData(projId);

  const envelope = await makeUkeoiEnvelope(data, status);

  const envelopesApi = new EnvelopesApi(apiClient);

  const results = await envelopesApi.createEnvelope(
    accountId,
    {
      envelopeDefinition: envelope,
    },
  );

  return {
    ...results,
    accountId,
  };
};
