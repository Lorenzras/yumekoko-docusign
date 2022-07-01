import {apiClient} from '../../config/settings';
import {EnvelopeDefinition, EnvelopesApi} from 'docusign-esign';

/**
 * Send envelope by template
 *
 * @param args
 * @returns {envelopId} Object containing envelopeId
 */
export const createEnvelopeFromTemplate = async (args: {
  accountId: string,
  envelope: EnvelopeDefinition
}) => {
  try {
    const {accountId, envelope} = args;
    console.log(args);
    const envelopesApi = new EnvelopesApi(apiClient);

    const results = await envelopesApi.createEnvelope(accountId, {
      envelopeDefinition: envelope,
    });


    const envelopeId = results.envelopeId;
    console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

    return {
      envelopeId: envelopeId,
      envelopesApi,
    };
  } catch (err: any) {
    throw new Error(`Error ${err}`);
  }
};
