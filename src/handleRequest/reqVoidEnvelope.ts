import {RequestHandler} from 'express';
import {voidEnvelope} from '../api/docusign';


/**
 * Request handler for voiding envelope
 *
 * @param req
 * @param {IVoidReq} req.body envelopeId, and voidedReason
 * @param res
 *
 */
export const reqVoidEnvelope : RequestHandler = async (
  req, res,
) => {
  try {
    const body: IVoidReq = req.body;
    const {
      envelopeId,
      voidedReason,
    } = body;
    // Does not do anything yet.

    const result = await voidEnvelope({envelopeId, voidedReason});

    res.send(200).json({
      voidSuccess: true,
      envelopeStatus: 'voided',
      envelopSummary: result,
    } as IVoidRes);
  } catch (err: any) {
    res.send(400).json(err);
  }
};
