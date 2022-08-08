import {APPIDS, KintoneRecord} from '../../api/kintone';
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
    custGroupId,
  } = await getProjByEnvelope(envelopeId);
  console.log(`Voiding envelope id: ${envelopeId}`);

  // Other values are cleared at the frontend.
  // This might be faulty so I might have to rethink this flow.
  const record : Partial<ProjectDetails.SavedData> = {
    // envelopeId: {value: ''},
    // envDocFileKeys: {value: []} as any, // Remove attached files
    // envelopeStatus: {value: ''},
    voidedEnvelopes: {value: [
      ...(voidedEnvelopes.value.split(',')),
      envelopeId,
    ].filter(Boolean).join(',')},
  };

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.projectDetails,
    id: $id.value,
    record: record,
  });

  console.log(result);

  await updateCustGroupLinkedProjects(custGroupId.value);

  return result;

  // Clear envelope details in the record
};
