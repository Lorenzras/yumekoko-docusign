import {getProjIdByEnvelope} from '../../api/kintone/getProjIdByEnvelope';

export const removeFromKintone = async (envelopeId: string) => {
  const recordId = await getProjIdByEnvelope(envelopeId);
  // Clear envelope details in the record
};
