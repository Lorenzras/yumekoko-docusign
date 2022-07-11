
import {RequestHandler} from 'express';
import {Xlsx} from 'exceljs';
import {getUkeoiData} from '../lib/contracts/getUkeoiData';
import {generateXlsxUkeoi} from '../lib/contracts/generateXlsxUkeoi';
import {generatePdfUkeoi} from '../lib/contracts/generatePdfUkeoi';


export const downloadUkeoi: RequestHandler = async (req, res) => {
  const {
    projId,
    fileType,
  } = req.query as Record<string, string>;

  console.log('Received project id', projId);

  let file;

  if (projId) {
    const data = await getUkeoiData(projId);
    switch (fileType) {
      case 'xlsx':
        file = await generateXlsxUkeoi(data, 'xlsx') as Xlsx;
        res.attachment(`請負契約書 - ${data.projName}.xlsx`)
          .status(200);
        await file.write(res);
        break;
      case 'pdf':
        file = await generatePdfUkeoi(data);
        res.status(200).send({
          data: file,
        });
    }
    res.end();
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
