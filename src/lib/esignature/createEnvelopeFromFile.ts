import {makeEnvelope} from './helpers/makeEnvelope';
import docusign from 'docusign-esign';

import {apiClient} from '../../config';


export const createEnvelopeFromFile = async (args: {
  filePath: string,
  basePath: string,
  accessToken: string,
  accountId: string,
}) => {
  const envelopesApi = new docusign.EnvelopesApi(apiClient);


  // Step 1. Make the envelope request body
  const envelope = await makeEnvelope({
    signerEmail: 'lenzras@gmail.com',
    signerName: 'Lorenz Ras',
    ccEmail: 'cocosumo.rpa03@gmail.com',
    ccName: 'RPA03',
    filePath: args.filePath,
    status: 'sent',
  });

  // Step 2. call Envelopes::create API method
  // Exceptions will be caught by the calling function
  const results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });

  console.log(results);

  const envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return {envelopeId: envelopeId};
};
