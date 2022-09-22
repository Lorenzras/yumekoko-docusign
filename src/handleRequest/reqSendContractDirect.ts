import {RequestHandler} from 'express';
import {
  processContract,
} from '../api/docusign/contracts/construction/processContract';

/**
 * Send contract directly without opening an intermediary link
 * @param req
 * @param res
 */
export const reqSendContractDirect: RequestHandler = async (req, res) => {
  const body: ReqSendContract = req.body;
  const {projEstimateId, userCode} = body;

  console.log('Processing contract');

  try {
    if (!projEstimateId) {
      throw new Error('見積番号は存在していません。');
    }

    if (!userCode ) {
      throw new Error('ユーザは存在していません。');
    }

    const result = await processContract(body, 'sent');
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
