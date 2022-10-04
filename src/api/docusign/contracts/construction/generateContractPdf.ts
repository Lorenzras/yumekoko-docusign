import {getContractData} from '../../../kintone/getContractData';
import path from 'path';
import {PDFDocument} from 'pdf-lib';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import {drawText} from '../helpers/pdf';
import {assetsDir} from '../config/file';
import {format, parseISO} from 'date-fns';


/**
 * Generate pdf on different formats
 *
 * @param contractData derived from getContractData
 * @param contentType
 * @returns {string} base64, widely supported format.
 * @returns {Uint8Array} for efficient saving as file.
 */
export const generateContractPdf = async (
  contractData : Awaited<ReturnType<typeof getContractData>>,
  contentType: 'base64' | 'img' | 'Uint8Array ' = 'base64',
) => {
  const {
    projId, projName, projLocation,
    custName, custAddress, cocoAG,
    payments,
    calculatedEstimates: {
      totalAmountInclTax,
      totalCPWithProfit,
      taxAmount,
      tax,
    },
  } = contractData;

  const {
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const url = path.join(assetsDir, '請負契約書.pdf');
  const existingPdfBytes = await fs.readFile(url);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontData = await fs
    .readFile(path.join(assetsDir, 'MSMINCHO.TTF'));

  // const font = fontkit.create(fontData);
  pdfDoc.registerFontkit(fontkit);
  const msChinoFont = await pdfDoc.embedFont(fontData, {subset: true});

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Common alignments
  const x1 = 124;
  const x2 = 183;
  const x3 = 239;

  // 工事番号
  drawText(
    firstPage,
    projId,
    {
      x: x1,
      y: 782,
      font: msChinoFont,
    },
  );

  // 工事名
  drawText(
    firstPage,
    projName,
    {
      x: x1 + 100,
      y: 782,
      font: msChinoFont,
    },
  );

  // 工事場所
  drawText(
    firstPage,
    projLocation,
    {
      x: x2,
      y: 580,
      font: msChinoFont,
    },
  );

  // 顧客名
  drawText(
    firstPage,
    `${custName} 様`,
    {
      x: x1,
      y: 680,
      font: msChinoFont,
    },
  );

  // 工事名
  drawText(
    firstPage,
    projName,
    {
      x: x1,
      y: 608,
      font: msChinoFont,
    },
  );


  /**
   * Footer
   */


  // 顧客住所
  drawText(
    firstPage,
    custAddress,
    {
      x: x2,
      y: 236,
      size: 9,
      font: msChinoFont,
    },
    {
      weight: 0.3,
    },
  );

  /* 請負代金金額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalAmountInclTax || 0).toLocaleString()}`,
    {
      x: 211,
      y: 493,
      size: 11,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 218,
      align: 'center',
    },
  );

  /* うち工事価格 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalCPWithProfit || 0).toLocaleString() }`,
    {
      x: 214,
      y: 479,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
      boxWidth: 200,
      align: 'right',
    },
  );


  /* 税 */
  drawText(
    firstPage,
    `(${tax} %)`,
    {
      x: 214,
      y: 466,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
    },
  );

  /* 税額 */
  drawText(
    firstPage,
    `￥ ${Math.round(taxAmount || 0).toLocaleString()}`,
    {
      x: 214,
      y: 466,
      size: 10,
      font: msChinoFont,
    },
    {
      weight: 0,
      boxWidth: 200,
      align: 'right',
    },
  );

  /* 支払い */
  const payLineHeight = 14;
  const payBase = 422.5;
  payments.map(({
    paymentAmt,
    paymentDate,
  }, idx) => {
    const rowY = payBase - (idx * payLineHeight);
    const resolvePayAmt = paymentAmt ? paymentAmt.toLocaleString() : '';
    let resolvePayDate = '';

    if (resolvePayAmt) {
      if (paymentDate) {
        resolvePayDate = format(parseISO(paymentDate), 'yyyy年MM月dd日');
      } else {
        resolvePayDate = '未定';
      }
    }

    /* 支払額 */
    drawText(
      firstPage,
      resolvePayAmt,
      {
        x: x3,
        y: rowY,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        align: 'right',
      },
    );

    /* 支払い日 */
    drawText(
      firstPage,
      resolvePayDate,
      {
        x: 394,
        y: rowY,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        boxWidth: 140,
        align: 'center',
      },
    );
  });


  // 顧客名 下
  drawText(
    firstPage,
    `${custName} 様`,
    {
      x: x2,
      y: 223,
      font: msChinoFont,
    },
  );

  // 担当者名
  drawText(
    firstPage,
    officerName,
    {
      x: x2,
      y: 151,
      font: msChinoFont,
    },
  );


  switch (contentType) {
    case 'base64':
      return await pdfDoc.saveAsBase64();
    case 'Uint8Array ':
    default:
      return await pdfDoc.save();
  }
};
