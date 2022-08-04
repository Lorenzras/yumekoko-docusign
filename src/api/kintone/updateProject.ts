import {APPIDS, KintoneRecord} from '.';
import {getProjByEnvelope} from './getProjByEnvelope';
import {updateCustGroupLinkedProjects} from './updateCustGroupLinkedProjects';
import {uploadFile} from './uploadFile';


export const updateProject = async ( {
  envelopeId,
  documents,
  envelopeStatus,
  event,
  recipients,
  projId,
  custGroupId,
} : {
  custGroupId?: string,
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
  let recordId = projId;
  let _custGroupId = custGroupId;

  // Search the id by envelope id,
  if (!recordId) {
    const {
      $id, custGroupId: cgId,
    } = await getProjByEnvelope(envelopeId);
    recordId = $id.value;
    _custGroupId = cgId.value; // update custGroupId if necessary
  }

  if (!_custGroupId) throw new Error('Invalid custGroupId.');


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

  // Generate updated record and attach the file
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


  // Save updated record
  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
    record,
  });

  // Also update cust group
  if (_custGroupId) {
    await updateCustGroupLinkedProjects(_custGroupId);
  }


  console.log('Succesfully update', result);
  return result;
};
