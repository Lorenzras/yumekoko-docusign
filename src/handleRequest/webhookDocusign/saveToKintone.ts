
import {APPIDS, KintoneClient, KintoneRecord} from '../../api/kintone';
import {getProjIdByEnvelope} from '../../api/kintone/getProjIdByEnvelope';

const uploadFile = async ({fileBase64, filename} :
{
  fileBase64: string,
  filename: string,
}) => {
  const data = Buffer.from(fileBase64, 'base64');
  const {fileKey} = await KintoneClient.file.uploadFile({
    file: {
      name: filename + '.pdf',
      data,
    },
  });

  return fileKey;
};

const updateRecord = async ( {
  envelopeId,
  fileBase64,
  filename,
  envelopeStatus,
  event,
} : {
  envelopeId: string,
  fileBase64: string
  filename: string,
  envelopeStatus: string,
  event: TConnectEventType
}) => {
  // Search the id by envelope id,
  const recordId = await getProjIdByEnvelope(envelopeId);

  // Upload the file
  let fileKey = '';

  switch (event) {
    case 'envelope-sent': // Sent to at least one recipient
    case 'recipient-completed': // A recipient signed
    case 'envelope-completed': // All recipients signed
      fileKey = await uploadFile({fileBase64, filename});
  }


  // update record and attach the file
  const record : Partial<ConstructionDetails.SavedData> = {
    envelopeId: {
      value: envelopeId,
    },
    envelopeStatus: {
      value: envelopeStatus,
    },
    // Conditionally update attached file if a new file is uploaded
    ...(
      fileKey ? {documents: {
        value: [{fileKey: fileKey}],
      }} : {}
    ),

  };

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
    record,
  });

  console.log('Succesfully update', result);
  return result;
};

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

      },

    },
  } = payload;

  // Get the firt document details
  // Will update this to be more flexible in case of
  // multiple documents.
  const {PDFBytes, name} = envelopeDocuments[0];

  return await updateRecord({
    envelopeId,
    envelopeStatus: status,
    fileBase64: PDFBytes,
    filename: name,
    event,
  });

  // await fs.writeFile(path.join(__dirname, 'test.pdf'), PDFBytes, 'base64');
};
