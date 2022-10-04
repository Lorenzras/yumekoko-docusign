

/**
 *
 * @param レコード
 * @returns {object}
 * @returns {number} object.totalCostPrice - 原価合計
 * @returns {number} object.totalCPWithProfit -  利益込み原価合計 | 税抜金額
 * @returns {number} object.totalAmountInclTax - 税込合計
 * @returns {number} object.taxAmount - 税合計
 * @returns {number} object.totalProfitRate - 粗利
 *
 */
export const calculateEstimate = (
  {
    tax,
    materials,
  } : {
    tax: number
    materials: {

      /** 利益率 */
      materialProfit: number,

      /** 数量 */
      quantity: number,

      /** 課税かどうか */
      isTaxable: boolean,

      /** 原価 */
      costPrice: number,

    }[]
  },
) => {
  const taxRate = +tax / 100;

  const result = materials
    .reduce((
      acc,
      {
        costPrice,
        quantity,
        isTaxable,
        materialProfit,
      },
    ) => {
      // 部材の利益率
      const matProfitRate = +materialProfit / 100;

      // 利益込み原価
      const unitPrice = +costPrice * (1 + matProfitRate);

      // 原価合計：原価 * 数量
      const rowTotalCostPrice = +costPrice * +quantity;

      // 税抜金額 ：利益込み原価 * 数量
      const rowTotalCPWithProfit = unitPrice * +quantity;

      // 税
      const taxMultiplyer = 1 + (isTaxable ? taxRate : 0 );

      // 税込金額 : 税抜金額 * 税
      const totalAmntInclTax = rowTotalCPWithProfit * taxMultiplyer;

      acc.totalAmountInclTax += totalAmntInclTax;
      acc.totalCostPrice += rowTotalCostPrice;
      acc.totalCPWithProfit += rowTotalCPWithProfit;

      acc.materials.push({
        costPrice,
        materialProfit,
        quantity,
        rowUnitPrice: unitPrice,
        rowTotalAmountInclTax: totalAmntInclTax,
      });

      return acc;
    }, {
      totalCostPrice: 0,
      totalCPWithProfit: 0,
      totalAmountInclTax: 0,
      materials: [] as {
        costPrice: number,
        quantity: number,
        materialProfit: number,
        rowUnitPrice: number,
        rowTotalAmountInclTax: number
      }[],
    });

  const {
    totalCostPrice,
    totalCPWithProfit,
    totalAmountInclTax,
  } = result;

  /** 粗利 */
  const totalProfit = totalCPWithProfit - totalCostPrice;

  return {
    ...result,

    totalProfit,

    /** 粗利率 ：粗利 / 原価合計 */
    totalProfitRate: totalProfit / totalCostPrice * 100,

    /** 税 ：税込金額 - 税抜金額 */
    taxAmount: totalAmountInclTax - totalCPWithProfit,
    tax: +tax,
  };
};
