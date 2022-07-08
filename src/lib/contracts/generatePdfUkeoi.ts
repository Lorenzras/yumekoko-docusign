/* eslint-disable max-len */
import fs from 'fs/promises';
import path from 'path';
import {degrees, PDFDocument, rgb, StandardFonts} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export const generatePdfUkeoi = async () => {
  const url = path.join(__dirname, 'assets', '請負契約書.pdf');
  const existingPdfBytes = await fs.readFile(url);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const fontData = await fs.readFile(path.join(__dirname, 'assets', 'MSMINCHO.TTF'));
  // const font = fontkit.create(fontData);
  pdfDoc.registerFontkit(fontkit);
  const msChinoFont = await pdfDoc.embedFont(fontData);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const {width, height} = firstPage.getSize();

  firstPage.drawText('出来ました。', {
    x: 0,
    y: height / 2 + 300,
    size: 50,
    font: msChinoFont,
    color: rgb(0.95, 0.1, 0.1),

  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
