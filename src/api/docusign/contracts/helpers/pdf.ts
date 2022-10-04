import {PDFPage, PDFPageDrawTextOptions, rgb} from 'pdf-lib';

type AdvancedOptions = {
  weight?: number,
  align?: 'left' | 'right' | 'center',
  boxWidth?: number,
  isShowBox?: boolean
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
    isShowBox = false,

  } = advancedOptions || {};
  const textWidth = font?.widthOfTextAtSize(text, size) ?? 0;
  const boxX = x ?? 0;
  const boxY = y ?? 0;

  if (isShowBox) {
    pdfPage.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxWidth,
      height: 50,
      borderColor: rgb(1, 0, 0),
    });
  }


  for (let i = 0; i <= weight; i += 0.1) {
    switch (align) {
      case 'left':
        pdfPage.drawText(text, {
          x: (x || 0) + i,
          y: y,
          size: size,
          font: font,
          color: color,
        });
        break;
      case 'right':
        pdfPage.drawText(text, {
          x: boxX + boxWidth - textWidth,
          y: boxY,
          font,
          size: size,
        });
        break;
      case 'center':
        pdfPage.drawText(text, {
          x: (boxX + (boxWidth / 2 )) - (textWidth / 2),
          y: boxY,
          font,
          size: size,
        });
        break;
    }
  }
};
