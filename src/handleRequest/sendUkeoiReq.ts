import {RequestHandler} from 'express';
import {createSenderView} from '../api/docusign/createSenderView';
import {processUkeoi} from '../lib/contracts/processUkeoi';

/**
 * Send contract directly without opening an intermediary link
 * @param req
 * @param res
 */
export const sendUkeoiReqDirect: RequestHandler = async (req, res) => {
  console.log('sendUkeoiReqDirect', req.get('origin'));
  const body: TProjIdReq = req.body;
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
        envelopeStatus: status,
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

// Will return URL.
export const sendUkeoiReq: RequestHandler = async (req, res) => {
  const body: TProjIdReq = req.body;

  const {
    envelopeId = '',
    origin = '',
  } = body;
  console.log('sendUkeoiReqDirect', origin);
  console.log('Received', envelopeId);
  try {
    if (envelopeId && typeof envelopeId === 'string') {
      const result = await createSenderView(envelopeId, origin);
      console.log('Send sender view');
      res.status(200).json(result);
    } else {
      res.status(401).send('<h1> 400 Bad Request</h1>');
    }
  } catch (error: any) {
    res.status(200).send(`Request failed. ${error.message}`);
  }
};
