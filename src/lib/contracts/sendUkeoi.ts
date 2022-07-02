/* eslint-disable max-len */
import {EnvelopesApi} from 'docusign-esign';

import {getAccountId} from '../authentication/fetchUserInfo';
import {apiClient} from '../../config';
import {getProjectDetails} from '../../api/kintone';
import {getCustomerGroup} from '../../api/kintone/getCustomerGroup';
import {makeUkeoiEnvelope} from '../envelopes/makeUkeoiEnvelope';

export const sendUkeoi = async (projId: string) => {
  const accountId = await getAccountId();
  const {
    custGroupId,
    constructionName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
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

  const envelope = await makeUkeoiEnvelope({
    custEmail: email,
    custName: customerName.value,
    projId: projId,
    projName: constructionName.value,
    custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
    projLocation: `〒${projPostal.value} ${projAddress1.value}${projAddress2.value}`,
    repEmail: 'cocosumo.rpa03@gmail.com',
    repName: '高橋　加奈',
  });
  const envelopesApi = new EnvelopesApi(apiClient);

  const results = await envelopesApi.createEnvelope(
    accountId,
    {
      envelopeDefinition: envelope,
    },
  );

  return results;
};
