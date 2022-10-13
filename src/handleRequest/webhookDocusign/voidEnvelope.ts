import {APPIDS, KintoneRecord} from '../../api/kintone';
import {getEstimateByEnvId} from '../../api/kintone/getEstimateByEnvId';
import {getProjByEnvelope} from '../../api/kintone/getProjByEnvelope';
import {
  updateCustGroupLinkedProjects,
} from '../../api/kintone/updateCustGroupLinkedProjects';

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
  } = await getEstimateByEnvId(envelopeId);
  console.log(`Voiding envelope id: ${envelopeId}`);

  // Other values are cleared at the frontend.
  // This might be faulty so I might have to rethink this flow.
  const record : Partial<ProjectEstimates.SavedData> = {
    envId: {value: ''},
    envDocFileKeys: {value: []} as any, // Remove attached files
    envStatus: {value: ''},
    envRecipients: {value: ''},
    voidedEnvelopes: {
      value: [
        ...(voidedEnvelopes.value.split(',')),
        envelopeId,
      ].filter(Boolean).join(',')},

  };

  /* TODO: Delete envelope file from kintone */

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.projEstimate,
    id: $id.value,
    record: record,
  });

  console.log(result);

  // Needs fix, this update customer record related projects
  // However, contracts are now dependent on 見積 rather than 工事
  // await updateCustGroupLinkedProjects(custGroupId.value);

  return result;

  // Clear envelope details in the record
};
