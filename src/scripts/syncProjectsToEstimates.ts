import {APPIDS, KintoneRecord} from '../api/kintone';

export const syncProjectsToEstimates = async () => {
  try {
    const projects = await KintoneRecord.getAllRecords({
      app: APPIDS.projEstimate,
    }) as unknown as ProjectEstimates.SavedData[];


    const updatedRecord = projects
      .map<{
      id: string,
      record: DeepPartial<ProjectEstimates.SavedData>

    }>(({projId, $id})=>{
      return {
        id: $id.value,
        record: {
          projId: {value: projId.value},
        },
      };
    });

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.projEstimate,
      records: updatedRecord as any,
    });


    return updated;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
