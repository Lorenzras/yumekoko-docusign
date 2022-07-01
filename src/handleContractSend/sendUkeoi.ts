import {EnvelopesApi} from 'docusign-esign';
import {makeUkeoiEnvelope} from '../envelopes/makeUkeoiEnvelope';
import {getAccountId} from '../lib/authentication/fetchUserInfo';
import {apiClient} from '../config';
import {getProjectDetails} from '../api/kintone';
import {getCustomerGroup} from '../api/kintone/getCustomerGroup';

export const sendUkeoi = async (projId: string) => {
  const accountId = await getAccountId();
  const {
    custGroupId,
    constructionName,
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
