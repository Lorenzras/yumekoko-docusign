import {APPIDS, KintoneRecord} from './config';

export const setEnvelopeId = async (projId: string, envelopeId: string) => {
  console.log(`Setting envelope id ${projId} ${envelopeId}`);
  const record: Partial<ConstructionDetails.SavedData> = {
    dsEnvIdUkeoi: {value: envelopeId},
  };

  return await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: projId,
    record: record,
  });
};
