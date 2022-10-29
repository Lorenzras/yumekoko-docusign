import {APPIDS, KintoneRecord} from '../api/kintone';

export const updateCustGroup = async () => {
  try {
    const records = await KintoneRecord.getAllRecords({
      app: APPIDS.custGroup,
    }) as unknown as CustomerGroupTypes.SavedData[];


    const updatedRecords = records
      .map<{
      id: string,
      record: DeepPartial<CustomerGroupTypes.SavedData>

    }>(({
      $id,
      agents,
      members,
    })=>{
      return {
        id: $id.value,
        record: {
          custNames: {
            value: members.value
              .map(({value: {customerName}})=>customerName.value)
              .join(','),
          },
          yumeAGNames: {
            value: agents.value
              .filter((
                {value: {agentType, employeeName}},
              ) => !!employeeName.value && agentType.value === 'yumeAG' )
              .map(({value: {employeeName}})=>employeeName.value)
              .join(','),
          },
          cocoAGNames: {
            value: agents.value
              .filter((
                {value: {agentType, employeeName}},
              ) => !!employeeName.value && agentType.value === 'cocoAG' )
              .map(({value: {employeeName}})=>employeeName.value)
              .join(','),
          },
        },
      };
    });

    console.log(updatedRecords);

    const updated = await KintoneRecord.updateAllRecords({
      app: APPIDS.custGroup,
      records: updatedRecords as any,
    });

    return updated;
  } catch (err : any) {
    throw new Error(err.message);
  }
};
