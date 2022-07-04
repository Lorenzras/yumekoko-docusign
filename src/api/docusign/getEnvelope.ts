import {EnvelopesApi} from 'docusign-esign';
import {apiClient} from '../../config';

export const getEnvelope = async (
  accountId: string,
  envelopeId: string,
) => {
  const envApi = new EnvelopesApi(apiClient);

  return await envApi.getEnvelope(accountId, envelopeId, null);
};
