import {APPIDS, KintoneRecord} from './config';

export const getCustomerGroup = async (custGrpId: string) => {
  if (!custGrpId) throw new Error('Invalid ProjId');

  return await KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGrpId,
  }).then((resp) => resp.record as unknown as CustomerGroupTypes.SavedData);
};
