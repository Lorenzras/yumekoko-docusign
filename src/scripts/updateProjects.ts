import {APPIDS, KintoneRecord} from '../api/kintone';

export const updateProjects = async () => {
  try {
    const records = await KintoneRecord.getAllRecords({
      app: APPIDS.projectDetails,
    }) as unknown as ProjectDetails.SavedData[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<ProjectDetails.SavedData>

    }>(({
      $id,
      custGroupId,
      agents,
    })=>{
      return {
        id: $id.value,
        record: {
          custGroupId: custGroupId,
          cocoConstNames: {
            value: agents.value
              .map(({value: {agentName}}) => agentName.value)
              .filter(Boolean)
              .join(', '),
          },
        },
      };
    });

    console.log(updatedRecords);

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.projectDetails,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err : any) {
    throw new Error(err.message);
  }
};
