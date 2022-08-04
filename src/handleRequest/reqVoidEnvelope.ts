import {RequestHandler} from 'express';
import {voidEnvelope} from '../api/docusign';
import {APPIDS, KintoneRecord} from '../api/kintone';
import {getProjByEnvelope} from '../api/kintone/getProjByEnvelope';

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


    if (!voidedReason) throw new Error('Server: 無効にする理由は定義されていません。');

    const result = await voidEnvelope({envelopeId, voidedReason});

    const {
      $id,
    } = await getProjByEnvelope(envelopeId);
    console.log(`Voiding envelope id: ${envelopeId}`);

    const record : Partial<ConstructionDetails.SavedData> = {
      envelopeId: {value: ''},
      envDocFileKeys: {value: []} as any, // Remove attached files
      envelopeStatus: {value: ''},

    };

    await KintoneRecord.updateRecord({
      app: APPIDS.constructionDetails,
      id: $id.value,
      record: record,
    });

    res.status(200).json({
      voidSuccess: true,
      envelopeStatus: 'voided',
      envelopSummary: result,
    } as IVoidRes);
  } catch (err: any) {
    // Return error from docusign api or validation error.
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }
};
