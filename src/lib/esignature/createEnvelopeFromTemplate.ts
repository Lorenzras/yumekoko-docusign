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
  envelope: Required<Pick<
  EnvelopeDefinition,
  | 'templateId'
  | 'emailSubject'
  | 'templateRoles'
  | 'status'
  >>
}) => {
  const {accountId, envelope} = args;

  const envelopesApi = new EnvelopesApi(apiClient);

  const results = await envelopesApi.createEnvelope(accountId, {
    envelopeDefinition: envelope,
  });

  console.log(results);

  const envelopeId = results.envelopeId;
  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return {envelopeId: envelopeId};
};
