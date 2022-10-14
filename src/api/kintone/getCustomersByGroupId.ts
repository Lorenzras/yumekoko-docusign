import {APPIDS, KintoneRecord} from './config';

export const getCustomersByIds = async (custIds: string[]) => {
  return KintoneRecord.getRecords({
    app: APPIDS.customers,
    query: custIds.map((cId) => `$id = "${cId}"`).join(' or '),
  }).then(({records}) => records as unknown as Customers.SavedData[]);
};
