
import {APPIDS, KintoneRecord} from './config';

/**
 * Set envelope id of the project
 * @deprecated use updateProject instead
 * @param projId
 * @param envelopeId
 * @returns {Revision} Object containing revision
 *
 */
export const setEnvelopeId = async (projId: string, envelopeId: string) => {
  console.log(`Setting envelope id ${projId} ${envelopeId}`);
  const record: Partial<ProjectDetails.SavedData> = {
    dsEnvIdUkeoi: {value: envelopeId},
  };

  return await KintoneRecord.updateRecord({
    app: APPIDS.projectDetails,
    id: projId,
    record: record,
  });
};
