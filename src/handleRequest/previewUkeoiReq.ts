import {EnvelopesApi} from 'docusign-esign';

/* eslint-disable max-len */
import {RequestHandler} from 'express';
import {processUkeoi} from '../lib/contracts/processUkeoi';
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

  if (projId) {
    //  const data = await getUkeoiData(projId);
    let result: ArrayBuffer;
    const envelope = await processUkeoi(projId, 'created');
    if ('error' in envelope) {
      res.status(400).send(envelope.error);
    } else {
      const {accountId, envelopeId} = envelope;
      const envAPI = new EnvelopesApi(apiClient);


      if (envelopeId) {
        result = await envAPI.getDocumentPageImage(accountId, envelopeId, '1', '1' ) as unknown as ArrayBuffer;
        res.status(200).send(arrayToBase64(result));
      }
    }
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
