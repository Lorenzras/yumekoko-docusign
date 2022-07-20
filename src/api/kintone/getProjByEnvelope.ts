import {KintoneRecord, APPIDS} from '.';
import {getKeyConstn} from './getKeyConstruction';

export const getProjByEnvelope = async (envelopeId: string) => {
  const {records} = await KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `${getKeyConstn('envelopeId')} = "${envelopeId}"`,
    fields: ['$id', 'voidedEnvelopes'] as KeyOfConstructionDetails[],
  });

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  const record = records[0] as unknown as ConstructionDetails.SavedData;

  return record;
};
