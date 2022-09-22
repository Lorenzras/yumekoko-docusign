import {TContractData} from './getContractData';


export const validateContractData = (data: TContractData) => {
  const {
    custEmail,
    officerEmail,
    storeMngrEmail,
    accountineEmail,
  } = data;

  if (!custEmail) throw new Error('顧客メールは指定しいません。');
  if (!officerEmail) throw new Error('担当メールは指定しいません。');
  if (!storeMngrEmail) throw new Error('店長メールは指定しいません。');
  if (!accountineEmail) throw new Error('経理メールは指定しいません。');
};
