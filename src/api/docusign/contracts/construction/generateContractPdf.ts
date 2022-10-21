import {getContractData} from '../../../kintone/getContractData';
import path from 'path';
import {grayscale, PDFDocument} from 'pdf-lib';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import {drawText} from '../helpers/pdf';
import {assetsDir, latestPDF} from '../config/file';
import {format, parseISO} from 'date-fns';
import {getPayMethodX} from './generateContractPdfHelper';


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
    customers,
    cocoAG,
    payments,
    calculatedEstimates: {
      totalAmountInclTax,
      totalCPWithProfit,
      taxAmount,
      tax,
    },
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    completeDate,
    contractDate,
    payDestination,
    payMethod,
  } = contractData;

  const {
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const url = path.join(assetsDir, latestPDF);
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
  const x1 = 124; // 工事番号
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

  // 顧客名
  drawText(
    firstPage,
    customers.map(({custName}) => `${custName} 様` ).join(' と '),
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
    customers[0].address,
    {
      x: x2,
      y: 238,
      size: 9,
      font: msChinoFont,
    }, {
      weight: 0.1,
    },
  );
  // drawCustAddress(customers, x2, firstPage, msChinoFont);

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

  /* 工期：着手 */
  drawText(
    firstPage,
    startDate ? format(parseISO(startDate), 'yyyy年MM月dd日') : '',
    {
      x: 239,
      y: 565,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 工期：着手の契約の日から＿＿日以内 */
  drawText(
    firstPage,
    startDaysAfterContract,
    {
      x: 299,
      y: 551,
      font: msChinoFont,
    },
    {
      weight: 0.1,
      boxWidth: 30,
      align: 'right',
    },
  );


  /* 工期：完成 */
  drawText(
    firstPage,
    finishDate ? format(parseISO(finishDate), 'yyyy年MM月dd日') : '',
    {
      x: 239,
      y: 537,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 102,
      align: 'center',
    },
  );

  /* 工期：完成の契約の日から＿＿日以内 */
  drawText(
    firstPage,
    finishDaysAfterContract,
    {
      x: 299,
      y: 523,
      font: msChinoFont,
    },
    {
      weight: 0.3,
      boxWidth: 30,
      align: 'right',
    },
  );

  /* 引渡しの時期、完成の日 */
  drawText(
    firstPage,
    completeDate ? format(parseISO(completeDate), 'yyyy年MM月dd日') : '',
    {
      x: 227,
      y: 509,
      font: msChinoFont,
      size: 10,
    },
    {
      weight: 0.1,
    },
  );

  /* 請負代金金額 */
  drawText(
    firstPage,
    `￥ ${Math.round(totalAmountInclTax || 0).toLocaleString()}`,
    {
      x: 211,
      y: 494,
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
      y: 480,
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
  const payYBase = 422.5;
  payments.map(({
    paymentAmt,
    paymentDate,
  }, idx) => {
    const rowY = payYBase - (idx * payLineHeight);
    const resolvePayAmt = paymentAmt ? paymentAmt.toLocaleString() : '';
    let resolvePayDate = '';

    if (resolvePayAmt && paymentDate) {
      resolvePayDate = format(parseISO(paymentDate), 'yyyy年MM月dd日');
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

  /* 支払い方法 */
  firstPage.drawCircle({
    x: getPayMethodX(payMethod),
    y: 369,
    size: 4,
    borderWidth: 1,
    color: grayscale(0.1),
    opacity: 0.1,
  });

  if (payMethod === '振込') {
    drawText(
      firstPage,
      payDestination,
      {
        x: 380,
        y: 367,
        font: msChinoFont,
      },
      {
        weight: 0.3,
        boxWidth: 152,
        align: 'center',
      },
    );
  }

  // 契約日
  drawText(
    firstPage,
    contractDate ? format(parseISO(contractDate), 'yyyy年MM月dd日') : '',
    {
      x: x1,
      y: 252,
      font: msChinoFont,
      size: 9,
    },
    {
      weight: 0.1,
    },
  );

  // 担当者名
  drawText(
    firstPage,
    officerName,
    {
      x: x2,
      y: 152,
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
