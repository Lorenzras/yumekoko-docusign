import {PDFPage, PDFPageDrawTextOptions, rgb} from 'pdf-lib';

/**
 * Hackish solution to implement font-weight (bold)
 * Update his, once pdf-lib officially support it.
 * https://github.com/Hopding/pdf-lib/discussions/998
 *
 * Author: Ras
 *
 * @param pdfPage
 * @param text
 * @param contentType
 * @param weight font weight in decimal. Default is 0.4
 */
export const drawText = async (
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
