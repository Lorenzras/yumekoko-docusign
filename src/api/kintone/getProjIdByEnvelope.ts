import {KintoneRecord, APPIDS} from '../../api/kintone';
import {getKeyConstn} from '../../lib/getKey/getKeyConstruction';

export const getProjIdByEnvelope = async (envelopeId: string) => {
  const {records} = await KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `${getKeyConstn('envelopeId')} = "${envelopeId}"`,
    fields: ['$id'],
  });

  console.log('Records', records);

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  const {$id} = records[0] as unknown as ConstructionDetails.SavedData;

  return $id.value;
};
