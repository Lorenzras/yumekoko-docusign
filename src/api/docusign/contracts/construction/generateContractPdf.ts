import {getContractData} from '../../../kintone/getContractData';
import path from 'path';
import {PDFDocument} from 'pdf-lib';
import fs from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
import {drawText} from '../helpers/pdf';
import {assetsDir} from '../config/file';


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
    custName, custAddress, officerName,
  } = contractData;
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
