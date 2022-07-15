import {APPIDS, KintoneRecord} from '.';
import {getProjByEnvelope} from './getProjByEnvelope';
import {uploadFile} from './uploadFile';


export const updateProject = async ( {
  envelopeId,
  documents,
  envelopeStatus,
  event,
  recipients,
  projId,
} : {
  projId?: string,
  envelopeId: string,
  documents: {
    fileBase64 :string,
    filename: string,
  }[],
  envelopeStatus: string,
  event: TConnectEventType,
  recipients: IRecipient[]
}) => {
  // Search the id by envelope id,

  let recordId = projId;

  if (!recordId) {
    const {
      $id,
    } = await getProjByEnvelope(envelopeId);
    recordId = $id.value;
  }


  // Upload the file
  let fileKeys: string[] = [];

  switch (event) {
    case 'envelope-sent': // Sent to at least one recipient
    case 'recipient-completed': // A recipient signed
    case 'envelope-completed': // All recipients signed
      if (documents.length) {
        fileKeys = await uploadFile(documents);
      }
  }


  console.log('Filekeys ' + fileKeys);
  // update record and attach the file
  const record : Partial<ConstructionDetails.SavedData> = {

    envelopeId: {
      value: envelopeId,
    },
    envelopeStatus: {
      value: envelopeStatus,
    },
    envelopeRecipients: {
      value: JSON.stringify(recipients),
    },

    // Conditionally update attached file if a new file is uploaded
    ...(
      fileKeys.length ?
        {envDocFileKeys: {
          type: 'FILE',
          value: fileKeys.map((fk) => {
            return {
              fileKey: fk,
              contentType: 'pdf',
              name: '',
              size: '',
            };
          }),
        }} : {}
    ),

  };

  console.log(record);

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
    record,
  });

  console.log('Succesfully update', result);
  return result;
};
