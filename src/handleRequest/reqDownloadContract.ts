
import {RequestHandler} from 'express';
import {Xlsx} from 'exceljs';
import {getUkeoiData} from '../api/docusign/contracts/getUkeoiData';
import {generateXlsxUkeoi} from '../api/docusign/contracts/generateXlsxUkeoi';
import {generatePdfUkeoi} from '../api/docusign/contracts/generatePdfUkeoi';


export const reqDownloadContract: RequestHandler = async (req, res) => {
  const {
    projId,
    projEstimateId,
    fileType,
  } = req.query as TReqDownloadParams;

  let file;

  if (projId) {
    const record = await getUkeoiData(projId);
    const {projName, envelopeStatus} = record;
    switch (fileType) {
      case 'xlsx':
        file = await generateXlsxUkeoi(record, 'xlsx') as Xlsx;
        res.attachment(`請負契約書 - ${projName}.xlsx`)
          .status(200);
        await file.write(res);
        break;
      case 'pdf':
        file = await generatePdfUkeoi(record, 'base64');

        res.status(200).json({
          // Array here to accomodate multi-documents in the future
          documents: [file],
          envelopeStatus,
        });
    }
    res.end();
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
