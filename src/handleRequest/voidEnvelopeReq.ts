import {RequestHandler} from 'express';

/**
 * Request handler for voiding envelope
 * @param req
 * @param res
 *
 */
export const voidEnvelopeReq : RequestHandler = async (
  req, res,
) => {
  const body: TProjReq = req.body;
  const {
    envelopeId,
  } = body;
  // Does not do anything yet.


  res.send(200).json({
    voidSuccess: true,
    error: '',
    envelopeStatus: '',
  });
};
