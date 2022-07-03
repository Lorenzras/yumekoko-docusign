import {EnvelopesApi} from 'docusign-esign';

/* eslint-disable max-len */
import {RequestHandler} from 'express';
import {Xlsx} from 'exceljs';
import {getUkeoiData} from '../lib/contracts/getUkeoiData';
import {generateXlsxUkeoi} from '../lib/contracts/generateXlsxUkeoi';
import {format} from 'date-fns';
import path from 'path';

import fs from 'fs/promises';
import {makeUkeoiEnvelope} from '../lib/contracts/makeUkeoiEnvelope';
import {sendUkeoi} from '../lib/contracts/sendUkeoi';
import {apiClient} from '../config';
import {arrayToBase64} from './../utils/arrayToBase64';

/**
 * Sends Image preview to the client.
 *
 * @param req
 * @param res
 */
export const previewUkeoiReq: RequestHandler = async (req, res) => {
  const {projId} = req.body as Record<string, string>;

  console.log('project id', projId);
  if (projId) {
    //  const data = await getUkeoiData(projId);
    let result: ArrayBuffer;
    const {envelopeId, accountId} = await sendUkeoi(projId, 'created');
    const envAPI = new EnvelopesApi(apiClient);
    if (envelopeId) {
      result = await envAPI.getDocumentPageImage(accountId, envelopeId, '1', '1' ) as unknown as ArrayBuffer;
      res.status(200).send(arrayToBase64(result));
    }


    // const file = await generateXlsxUkeoi(data, 'xlsx') as Xlsx;


    /*  // Path
    const fileName = `${user}${format(new Date(), 'yyyyMMddHHmmss.SSS')}`;
    const fullPath = path.join(__dirname, 'temp', fileName);

    // Save Excel
    await file.writeFile(fullPath + '.xlsx');


    res
      .set('Content-Type', 'application/base64')
      .status(200)
      .send(Buffer.from(await file.writeBuffer()).toString('base64'))
      .end(); */
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
