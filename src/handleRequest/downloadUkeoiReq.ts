
import {RequestHandler} from 'express';
import {Xlsx} from 'exceljs';
import {getUkeoiData} from '../lib/contracts/getUkeoiData';
import {generateXlsxUkeoi} from '../lib/contracts/generateXlsxUkeoi';

export const downloadUkeoiReq: RequestHandler = async (req, res) => {
  const projId = req.query.projId as string;

  console.log('Received project id', projId);
  if (projId) {
    const data = await getUkeoiData(projId);
    const file = await generateXlsxUkeoi(data, 'xlsx') as Xlsx;


    res.attachment(`請負契約書 - ${data.projName}.xlsx`)
      .status(200);

    await file.write(res);
    res.end();
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
