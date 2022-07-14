import fs from 'fs/promises';
import path from 'path';
import {APPIDS, KintoneClient, KintoneRecord} from '../../api/kintone';
import {getKeyConstn} from '../../lib/getKey/getKeyConstruction';


const uploadFile = async ( {
  envelopeId,
  fileBase64,
  filename,
  envelopeStatus,
} : {
  envelopeId: string,
  fileBase64: string
  filename: string,
  envelopeStatus: string,
}) => {
  // Search the id by envelope id,
  const {records} = await KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `${getKeyConstn('envelopeId')} = "${envelopeId}"`,
  });

  console.log('Records', records);

  if (!records.length) throw new Error('Envelope not linked to kintone');

  const {$id} = records[0] as unknown as ConstructionDetails.SavedData;

  // Upload the file
  const data = Buffer.from(fileBase64, 'base64');
  const {fileKey} = await KintoneClient.file.uploadFile({
    file: {
      name: filename + '.pdf',
      data,
    },

  });

  // update record and attach the file
  const record : Partial<ConstructionDetails.SavedData> = {
    envelopeId: {
      value: envelopeId,
    },
    envelopeStatus: {
      value: envelopeStatus,
    },
    documents: {
      value: [{fileKey}],
    },
  };

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: $id.value,
    record,
  });

  console.log('Succesfully update', result);
  return result;
};

export const updateKintone = async (payload: ConnectEvent) => {
  const {
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

  return await uploadFile({
    envelopeId,
    envelopeStatus: status,
    fileBase64: PDFBytes,
    filename: name,
  });

  // await fs.writeFile(path.join(__dirname, 'test.pdf'), PDFBytes, 'base64');
};
