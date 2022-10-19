import {PDFFont, PDFPage} from 'pdf-lib';
import {getContractData, TContractData} from '../../../kintone/getContractData';
import {drawText} from '../helpers/pdf';

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


/**
 * Just in case,
 * the requirement is to show address for each customer
 *
 * @param customers
 * @param baseX
 * @param page
 * @param font
 */
export const drawCustAddress = (
  customers: Awaited<ReturnType<typeof getContractData>>['customers'],
  baseX: number,
  page: PDFPage,
  font: PDFFont,
) => {
  // 顧客住所
  const addressFontSize = 10;
  const testCustomers = [customers[0]];
  const custLength = testCustomers.length;

  let custSignX = baseX;

  testCustomers
    .forEach(({
      address: custAddress,
      postalCode,
      address1,
      address2,
    }) => {
      const postalAndAddress1 = `${postalCode}〒${address1}`;
      const custFontSize = addressFontSize - custLength;
      const textWidth = font
        ?.widthOfTextAtSize(postalAndAddress1, custFontSize) ?? 0;

      const newOffset = (textWidth + 10 );

      console.log('newOffset', newOffset, custSignX);

      if (custLength === 1) {
        drawText(
          page,
          custAddress,
          {
            x: custSignX,
            y: 238,
            size: addressFontSize,
            font: font,
          }, {
            weight: 0.1,

          },
        );
      }

      if (custLength >= 2) {
        drawText(
          page,
          `${postalCode}〒${address1}`,
          {
            x: custSignX,
            y: 245,
            size: custFontSize,
            font: font,
          }, {
            weight: 0.1,

          },
        );
        drawText(
          page,
          `${address2}fuk`,
          {
            x: custSignX,
            y: 237,
            size: custFontSize,
            font: font,
          }, {
            weight: 0.1,

          },
        );
      }

      custSignX += newOffset;
    });
};
