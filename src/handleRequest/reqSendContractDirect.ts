import {RequestHandler} from 'express';
import {processUkeoi} from '../api/docusign/contracts/processUkeoi';

/**
 * Send contract directly without opening an intermediary link
 * @param req
 * @param res
 */
export const reqSendContractDirect: RequestHandler = async (req, res) => {
  const body: TProjReq = req.body;
  const {projId, custGroupId} = body;

  console.log('Processing contract');

  try {
    if (!custGroupId) throw new Error('Server did not receive custGroupId');
    if (!projId ) throw new Error('Server did not receive projId');

    const result = await processUkeoi(projId, custGroupId);
    const {
      documents,
      envelopeSummary: {
        status = '',
        envelopeId = '',
      } = {},
    } = result;

    console.log('Done processing contract creation.');

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
  } catch (err: any) {
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }
};
