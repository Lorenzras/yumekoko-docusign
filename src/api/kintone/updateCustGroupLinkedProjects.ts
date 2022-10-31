import {KintoneRecord, APPIDS} from './config';

// https://developer.cybozu.io/hc/ja/articles/204537310-%E7%AC%AC11%E5%9B%9E-kintone-REST-API%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E6%9B%B4%E6%96%B0-%E3%83%AB%E3%83%83%E3%82%AF%E3%82%A2%E3%83%83%E3%83%97%E8%87%AA%E5%8B%95%E6%9B%B4%E6%96%B0-
// Need to manually update cust group.


export const updateCustGroupLinkedProjects = async (custGroupId: string) => {
  const custGroupRec = await KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
  });

  const {projects} = custGroupRec
    .record as unknown as CustomerGroupTypes.SavedData;

  const record: DeepPartial<CustomerGroupTypes.SavedData> = {
    projects: {
      type: 'SUBTABLE',
      value: projects.value.map((row)=>{
        const {value} = row;
        const {projId} = value;
        return {
          value: {
            projId: {value: projId.value},
          },
        };
      }),
    },
  };

  // Refresh linked customer group record
  await KintoneRecord.updateRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
    record: record as any,
  });
};
