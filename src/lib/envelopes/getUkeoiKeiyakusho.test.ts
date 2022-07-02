import {
  createEnvelopeFromTemplate,
} from '../lib/esignature/createEnvelopeFromTemplate';
import {getAccountId} from '../lib/authentication/fetchUserInfo';
import {getUkeoiKeiyakusho} from './getUkeoiKeiyakusho';
import {getCustomerGroup} from '../api/kintone/getCustomerGroup';
import {getProjectDetails} from '../api/kintone';
import {getUkeoiTabs} from './tabs/getUkeoiTabs';

describe('getUkeoiKeiyakusho', ()=>{
  it('should be able to send envelope with prefill tabs', async ()=>{
    const accountId = await getAccountId();
    // Get data to fill the document.
    const projId = '111';
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

    // Create envelope
    const envelope = await getUkeoiKeiyakusho({
      companyEmail: 'cocosumo.rpa03@gmail.com',
      companyRepName: 'テスト',
      custName: customerName.value,
      email: email,
      projName: constructionName.value,
      status: 'sent',
      projId,
    });


    const {envelopeId, envelopesApi} = await createEnvelopeFromTemplate({
      accountId, envelope,
    });

    const tabs = getUkeoiTabs({
      custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
      custName: customerName.value,
      projName: constructionName.value,
      projId,
    });


    console.log('EnvelopeId', envelopeId);
    if (envelopeId) {
      console.log(accountId, envelopeId, tabs);
      const res = await envelopesApi
        .createDocumentTabs(accountId, envelopeId, '1', tabs);
      console.log(res);
    }


    expect(envelopeId).toMatchSnapshot();
  }, 30000);
});
