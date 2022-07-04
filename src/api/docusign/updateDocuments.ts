/* eslint-disable max-len */
import {Document, EnvelopeDefinition, EnvelopesApi} from 'docusign-esign';
import {apiClient, basePath} from '../../config';
import axios from 'axios';
import {getJwtGrantToken} from '../../lib/authentication/fetchAccessToken';
import {getAccountId} from '../../lib/authentication/fetchUserInfo';

export const updateDocuments = async ({
  envelopeId,
  envelope,
}:
{
  envelopeId: string,
  envelope: EnvelopeDefinition
},
) => {
  const accountId = await getAccountId();
  const envApi = new EnvelopesApi(apiClient);

  // https://docusign.github.io/docusign-esign-node-client/module-api_EnvelopesApi.html#updateDocuments
  const result = await envApi.updateDocuments(accountId, envelopeId, {envelopeDefinition: envelope});

  return result;
};
