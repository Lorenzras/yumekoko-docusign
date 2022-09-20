import {APPIDS, KintoneRecord} from './config';

export const getEstimateById = async (id: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.projEstimate,
    id,
  });
  return result.record as unknown as ProjectEstimates.SavedData;
};
