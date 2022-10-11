import {TContractData} from '../../../kintone/getContractData';

export const getPayMethodX = (
  payMethod: TContractData['payMethod'],
) =>{
  switch (payMethod) {
    case '持参': return 175;
    case '集金': return 247;
    case '振込': return 320;
    default: throw new Error(`支払い方法が不明でした。${payMethod}`);
  }
};
