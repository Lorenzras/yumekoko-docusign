import {APPIDS, KintoneRecord} from './config';


export const getStoreMngrByStoreId = async (storeId: string) => {
  try {
    const keyStoreId : KeyOfEmployeesStores = 'storeId';
    const affiliation: KeyOfEmployees = 'affiliation';
    const role : KeyOfEmployees = '役職';
    const cocosumo: Company = 'ここすも';

    const {records} = await KintoneRecord.getRecords({

      app: APPIDS.employees,

      /*
        テーブル内のフィールドを取得する際には「=」、「!=」演算子が使えません。
        その代わりに「in」、「not in」演算子を使う必要があります
        https://developer.cybozu.io/hc/ja/articles/900001057206-kintone-API-%E3%81%AE%E3%82%AF%E3%82%A8%E3%83%AA%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%81%AE%E5%9F%BA%E6%9C%AC
      */
      query: [
        `${keyStoreId} in ("${storeId}")`,
        `${affiliation} in ("${cocosumo}")`,
        `${role} in ("店長")`,
      ].join(' and '),
    });

    if (!records.length) throw new Error(`店長の情報は取得できませんでした。店舗番号：${storeId}`);

    return records[0] as unknown as Employees.SavedData;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
