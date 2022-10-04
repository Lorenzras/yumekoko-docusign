import {PDFPage, PDFPageDrawTextOptions, rgb} from 'pdf-lib';

type AdvancedOptions = {
  weight?: number,
  align?: 'left' | 'right',
  boxWidth?: number,
}

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
 * @param advancedOptions
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
  advancedOptions?: AdvancedOptions,
) => {
  const {
    weight = 0.4,
    align = 'left',
    boxWidth = 102,
  } = advancedOptions || {};
  const textWidth = font?.widthOfTextAtSize(text, size) ?? 0;
  const boxX = x ?? 0;
  const boxY = y ?? 0;


  for (let i = 0; i <= weight; i += 0.1) {
    if (align=== 'left') {
      pdfPage.drawText(text, {
        x: (x || 0) + i,
        y: y,
        size: size,
        font: font,
        color: color,
      });
    } else {
      /*
        For debugging, don't remove
      console.log(boxX + boxWidth - textWidth, boxX, boxWidth, textWidth, font);
      pdfPage.drawRectangle({
        x: boxX,
        y: boxY,
        width: boxWidth,
        height: 50,
        borderColor: rgb(1, 0, 0),
      }); */
      pdfPage.drawText(text, {
        x: boxX + boxWidth - textWidth,
        y: boxY,
        font,
        size: size,
      });
    }
  }
};
