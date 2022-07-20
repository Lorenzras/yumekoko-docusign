import {RequestHandler} from 'express';
import {processUkeoi} from '../api/docusign/contracts/processUkeoi';

/**
 * Send contract directly without opening an intermediary link
 * @param req
 * @param res
 */
export const reqSendContractDirect: RequestHandler = async (req, res) => {
  const body: TProjReq = req.body;
  const projId = body.projId;

  try {
    if (projId && typeof projId === 'string') {
      const result = await processUkeoi(projId);
      const {
        documents,
        envelopeSummary: {
          status = '',
          envelopeId = '',
        } = {},
      } = result;

      const sendResp : ISendEnvelopeResponse = {
        documents: documents ?? [],
        envelopeId,
        envelopeStatus: status as TEnvelopeStatus,
      };

      if (status) {
        res.status(200).json(sendResp);
      } else {
        throw new Error('Envelope creation failed');
      }
    } else {
      res.status(401).send('Bad Request');
    }
  } catch (error: any) {
    res.status(400).send(`Request failed. ${error.message}`);
  }
};
