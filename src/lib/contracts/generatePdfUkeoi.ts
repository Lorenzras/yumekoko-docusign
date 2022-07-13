/* eslint-disable max-len */
import fs from 'fs/promises';
import path from 'path';
import {degrees, PDFDocument, PDFPage, PDFPageDrawTextOptions, rgb, StandardFonts} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
// eslint-disable-next-line import/default
import {fromBuffer} from 'pdf2pic';


/**
 * Hackish solution to implement font-weight (bold)
 * I will update this, once pdf-lib officially support it.
 * https://github.com/Hopding/pdf-lib/discussions/998
 *
 * @param pdfPage
 * @param text
 * @param contentType
 * @param weight font weight in decimal. Default is 0.4
 */
const drawText = async (
  pdfPage: PDFPage,
  text: string,

  {
    x,
    y,
    color = rgb(0, 0, 0),
    size = 10,
    font,
  } : PDFPageDrawTextOptions,
  weight = 0.4,
) => {
  for (let i = 0; i <= weight; i += 0.1) {
    pdfPage.drawText(text, {
      x: (x || 0) + i,
      y: y,
      size: size,
      font: font,
      color: color,
    });
  }
};

export const generatePdfUkeoi = async (
  {
    custName, projId, projName, custAddress,
    projLocation, repName,
  }: TUkeoiFields,
  contentType: 'base64' | 'img' | 'Uint8Array ' = 'base64',
) => {
  const url = path.join(__dirname, 'assets', '請負契約書.pdf');
  const existingPdfBytes = await fs.readFile(url);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontData = await fs.readFile(path.join(__dirname, 'assets', 'MSMINCHO.TTF'));
  // const font = fontkit.create(fontData);
  pdfDoc.registerFontkit(fontkit);
  const msChinoFont = await pdfDoc.embedFont(fontData, {subset: true});

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Common alignments
  const x1 = 124;
  const x2 = 183;

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
    0.3,
  );

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
    repName,
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
