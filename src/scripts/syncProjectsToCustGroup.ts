import {APPIDS, KintoneRecord} from '../api/kintone';

export const syncProjectsToCustGroup = async () => {
  try {
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

          projectCount: {value: `${projects.value.length ?? 0}`},
          projects: {
            value: projects.value.map(({value})=>{
              const {projId} = value;

              return {
                value: {
                  projId: {value: projId.value},
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
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
