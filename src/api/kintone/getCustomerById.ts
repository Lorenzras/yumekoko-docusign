import {APPIDS, KintoneRecord} from './config';

export const getCustomerById = async (id: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.customers,
    id,
  });

  return result.record as unknown as Customers.SavedData;
};
