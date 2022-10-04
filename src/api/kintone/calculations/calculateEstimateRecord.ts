import {calculateEstimate} from './calculateEstimate';


export const calculateEstimateRecord = async (
  estimateRecord: ProjectEstimates.SavedData,
) => {
  const {
    内訳: {value: estimateTable},
    税: {value: tax},
  } = estimateRecord;

  const result = calculateEstimate({
    tax: +tax,
    materials: estimateTable.map(({value: {
      原価: {value: costPrice},
      数量: {value: quantity},
      taxType: {value: taxType},
      部材利益率: {value: materialProfit},
    }}) => {
      return {
        costPrice: +costPrice,
        quantity: +quantity,
        isTaxable: taxType === '課税',
        materialProfit: +materialProfit,
      };
    }),
  });

  return result;
};
