import {KintoneRecord, APPIDS} from '.';
import {getKeyConstn} from './getKeyConstruction';

/**
 * Get project by envolope
 *
 * @param envelopeId
 * @returns {object} Record data
 * @deprecated envelopes are not managed in project anymore but in mitsumori
 */
export const getProjByEnvelope = async (envelopeId: string) => {
  const {records} = await KintoneRecord.getRecords({
    app: APPIDS.projectDetails,
    query: `${getKeyConstn('envelopeId')} = "${envelopeId}"`,
    fields: ['$id', 'voidedEnvelopes'] as KeyOfProjDetails[],
  });

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  const record = records[0] as unknown as ProjectDetails.SavedData;

  return record;
};
