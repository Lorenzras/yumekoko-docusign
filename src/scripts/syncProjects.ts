import {APPIDS, KintoneRecord} from '../api/kintone';

export const syncProjects = async () => {
  const custGroups = await KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
  }) as unknown as CustomerGroupTypes.SavedData[];

  const updatedCustGroup = custGroups
    .map<{
    id: string,
    record: DeepPartial<CustomerGroupTypes.SavedData>

  }>(({projects, $id})=>{
    return {
      id: $id.value,
      record: {
        projects: {
          value: projects.value.map(({value})=>{
            const {constructionId} = value;
            console.log('cc', constructionId.value);
            return {
              value: {
                ...value,
                constructionId: {value: constructionId.value},
              },
            };
          }),
        },
      },

    };
  });

  const updated = await KintoneRecord.updateAllRecords({
    app: APPIDS.custGroup,
    records: updatedCustGroup as any,
  });


  return updated;
};
