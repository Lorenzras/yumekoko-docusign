import {APPIDS, KintoneRecord} from './config';

export const getEmployeesByIds = async (ids: string[]) => {
  const query = ids.map((id) => {
    return `$id = "${id}"`;
  }).join(' or ');

  const result = await KintoneRecord.getRecords({
    app: APPIDS.employees,
    query,
  });

  return result.records as unknown as Employees.SavedData[];
};
