import {APPIDS, KintoneRecord} from '../../api/kintone';
import {getProjByEnvelope} from '../../api/kintone/getProjByEnvelope';

/**
 * Webhook event that is triggered when
 * enveloped is voided
 *
 * @param envelopeId
 * @returns {Object} request result
 */
export const voidEnvelope = async (envelopeId: string) => {
  const {
    $id,
    voidedEnvelopes,
  } = await getProjByEnvelope(envelopeId);
  console.log(`Voiding envelope id: ${envelopeId}`);

  const record : Partial<ConstructionDetails.SavedData> = {
    envelopeId: {value: ''},
    envDocFileKeys: {value: []} as any, // Remove attached files
    envelopeStatus: {value: ''},
    voidedEnvelopes: {value: [
      ...(voidedEnvelopes.value.split(',')),
      envelopeId,
    ].filter(Boolean).join(',')},
  };

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: $id.value,
    record: record,
  });

  console.log(result);

  return result;

  // Clear envelope details in the record
};
