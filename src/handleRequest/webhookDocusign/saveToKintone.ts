
import {updateEstimateEnvelope} from '../../api/kintone/updateEstimateEnvelope';

/**
 * Handle update kintone process
 *
 * @param payload
 * @returns {Object} containing revision number
 */
export const saveToKintone = async (payload: IConnectEvent) => {
  const {
    event,
    data: {
      envelopeId,
      envelopeSummary: {
        status,
        envelopeDocuments,
        recipients,
      },

    },
  } = payload;

  // Get the firt document details
  // Will update this to be more flexible in case of
  // multiple documents.
  const documents = envelopeDocuments.map(({PDFBytes, name}) => {
    return {
      fileBase64: PDFBytes,
      filename: name,
    };
  });

  console.log(`Saving envelope id: ${envelopeId}`);


  return await updateEstimateEnvelope({
    envelopeId,
    envelopeStatus: status,
    documents,
    event,
    recipients,
  });

  // await fs.writeFile(path.join(__dirname, 'test.pdf'), PDFBytes, 'base64');
};
