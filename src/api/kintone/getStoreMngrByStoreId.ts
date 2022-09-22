import {APPIDS, KintoneRecord} from './config';


export const getStoreMngrByStoreId = async (storeId: string) => {
  try {
    const keyStoreId : keyof Employees.SavedData = 'mainStoreId';
    const {records} = await KintoneRecord.getRecords({
      app: APPIDS.employees,
      query: `${keyStoreId} = "${storeId}"`,
    });

    if (!records.length) throw new Error(`店長の情報は取得できませんでした。店舗番号：${storeId}`);

    return records[0] as unknown as Employees.SavedData;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
