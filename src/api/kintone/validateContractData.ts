import {TContractData} from './getContractData';


export const validateContractData = (data: TContractData) => {
  const {
    customers,
    cocoAG,
    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

    signMethod,
  } = data;


  if (!cocoAG?.[0]?.email) throw new Error(`COCO担当メールは指定されていません。${cocoAG?.[0]?.name}`);
  if (!storeMngrEmail) throw new Error(`店長メールは指定されていません。${storeMngrName}`);
  if (!accountingEmail) throw new Error(`経理メールは指定されていません。${accountingName}`);

  if (signMethod === 'electronic') {
    const invalidEmail = customers.find(({email}) => !email);
    if (invalidEmail) throw new Error(`顧客メールは指定されていません。${invalidEmail.custName}`);

    const unique = [...new Set(customers.map((item) => item.email))];
    if (unique.length !== customers.length) {
      throw new Error(`同一のメールアドレスが登録されています。${customers.map(({custName, email}) => `${custName}:${email}`).join(',')}`);
    }
  }
};
