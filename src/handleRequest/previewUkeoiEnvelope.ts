import {EnvelopesApi} from 'docusign-esign';

/* eslint-disable max-len */
import {RequestHandler} from 'express';
import {processUkeoi} from '../api/docusign/contracts/processUkeoi';
import {apiClient} from '../config';
import {arrayToBase64} from '../utils/arrayToBase64';
import {docusignLocale} from '../api/docusign/locale/docusign';

type TPreviewResp = {
  imgB64: string,
  envelopeId: string,
  status: string,
}

/**
 * Genearate image via docusign api then
 * sends to the client.
 *
 * @param req
 * @param res
 * @deprecated replaced by downloadContract
 */
export const previewUkeoiEnvelope: RequestHandler = async (req, res) => {
  const {projId} = req.body as TReqPreviewParams;
  console.log(`Received project id ${projId} ${req.get('origin')}`);

  if (projId) {
    let result: ArrayBuffer;
    const ukeoi = await processUkeoi(projId, 'created');
    const {accountId, envelopeSummary} = ukeoi;
    if (('error' in ukeoi)) {
      res.status(400).send(ukeoi.error);
    } else if (envelopeSummary) {
      const {envelopeId, status} =envelopeSummary;
      const envAPI = new EnvelopesApi(apiClient);

      if (envelopeId) {
        console.log(`Getting document page image ${status} ${accountId}`);
        result = await envAPI.getDocumentPageImage(accountId, envelopeId, '1', '1' ) as unknown as ArrayBuffer;

        res.status(200).send({
          imgB64: arrayToBase64(result),
          envelopeId: envelopeId,
          status: status ? docusignLocale[status] || status : status,
        } as TPreviewResp);
      }
    }
  } else {
    res.status(501).send('Invalid project id.').end();
  }
};
