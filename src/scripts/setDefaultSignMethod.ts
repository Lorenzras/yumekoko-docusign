import {APPIDS, KintoneRecord} from '../api/kintone';
import {getKeyConstn} from '../api/kintone/getKeyConstruction';

export const setDefaultSignMethod = async () => {
  const projects = await KintoneRecord.getAllRecords({
    app: APPIDS.projectDetails,
    condition: `${getKeyConstn('signMethod')} = ""`,
    fields: ['$id'] as KeyOfProjDetails[],
  }) as unknown as ProjectDetails.SavedData[];

  console.log(`Count: ${projects.length} `);

  const updatedProject = projects.map<{
    id: string,
    record: DeepPartial<ProjectDetails.SavedData>
  }>(({$id})=>{
    return {
      id: $id.value,
      record: {
        signMethod: {value: ((v: TSignMethod) => v)('electronic')},
      },
    };
  });

  const updated = await KintoneRecord.updateAllRecords({
    app: APPIDS.projectDetails,
    records: updatedProject as any,
  });

  return updated;
};
