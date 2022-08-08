import {APPIDS, KintoneRecord} from './config';

export const getProjectDetails = async (projId: string) => {
  if (!projId) throw new Error('Invalid ProjId');

  return await KintoneRecord.getRecord({
    app: APPIDS.projectDetails,
    id: projId,
  }).then((resp) => resp.record as unknown as ProjectDetails.SavedData);
};
