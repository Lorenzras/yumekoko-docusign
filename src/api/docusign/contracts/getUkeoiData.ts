/* eslint-disable max-len */

import {getProjectDetails} from '../../kintone';
import {getCustomerGroup} from '../../kintone/getCustomerGroup';


/**
 * This combine and normalize data related to the project Id
 *
 * @param projId
 * @returns {TUkeoiFields} The normalized data.
 */
export const getUkeoiData = async (projId: string) => {
  const {
    custGroupId,
    constructionName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
    envelopeId, envelopeStatus,
  } = await getProjectDetails(projId);

  const custGrpDetails = await getCustomerGroup(
    custGroupId.value,
  );

  const {members} = custGrpDetails;

  const {
    customerName, address1,
    address2, postal, dump} = members.value[0].value;

  const {email} = JSON.parse(dump.value);

  if (!email) throw new Error('Invalid email.');

  const projData : TUkeoiFields = {
    custEmail: email,
    custName: customerName.value,
    projId: projId,
    projName: constructionName.value,
    custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
    projLocation: `〒${projPostal.value} ${projAddress1.value}${projAddress2.value}`,
    repEmail: 'cocosumo.rpa03@gmail.com',
    repName: '高橋　加奈',
    envelopeId: envelopeId.value,
    envelopeStatus: envelopeStatus.value,
  };

  return projData;
};
