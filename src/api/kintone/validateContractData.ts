import {TContractData} from './getContractData';


export const validateContractData = (data: TContractData) => {
  const {
    custName,
    custEmail,
    cocoAG,
    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

  } = data;

  if (!custEmail) throw new Error(`顧客メールは指定しいません。${custName}`);
  if (!cocoAG?.[0]?.email) throw new Error(`COCO担当メールは指定しいません。${cocoAG?.[0]?.name}`);
  if (!storeMngrEmail) throw new Error(`店長メールは指定しいません。${storeMngrName}`);
  if (!accountingEmail) throw new Error(`経理メールは指定しいません。${accountingName}`);
};
