import {APPIDS, KintoneRecord} from './config';
import {getEstimateByEnvId} from './getEstimateByEnvId';
import {uploadFileToKintone} from './uploadFileToKintone';

export const updateEstimateEnvelope = async ({
  envelopeId,
  documents,
  envelopeStatus,
  event,
  recipients,
  projEstimateId,
  signMethod,
} : {
  custGroupId?: string,
  projEstimateId?: string,
  signMethod?: ReqSendContract['signMethod'],
  envelopeId: string,
  documents: {
    fileBase64 :string,
    filename: string,
  }[],
  envelopeStatus: string,
  event: TConnectEventType,
  recipients: IRecipient[]
}) => {
  let recordId = projEstimateId;

  // Search the id by envelope id,
  if (!recordId) {
    const {
      $id,
    } = await getEstimateByEnvId(envelopeId);
    recordId = $id.value;
  }


  // Upload the file
  let fileKeys: string[] = [];

  switch (event) {
    case 'envelope-sent': // Sent to at least one recipient
    case 'recipient-completed': // A recipient signed
    case 'envelope-completed': // All recipients signed
      if (documents.length) {
        fileKeys = await uploadFileToKintone(documents);
      }
  }

  // Generate updated record and attach the file
  const record : Partial<ProjectEstimates.SavedData> = {
    envId: {
      value: envelopeId,
    },
    envStatus: {
      value: envelopeStatus,
    },
    envRecipients: {
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

  if (signMethod) {
    record['signMethod'] = {value: signMethod};
  }


  // Save updated record
  const result = await KintoneRecord.updateRecord({
    app: APPIDS.projEstimate,
    id: recordId,
    record,
  });


  return result;
};
