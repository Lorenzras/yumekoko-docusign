import {EnvelopeDefinition, Tabs, Text} from 'docusign-esign';
import {templateIds} from '../../config/envelopeTemplates';
import {getProjectDetails} from '../kintone';
import {getCustomerGroup} from '../kintone/getCustomerGroup';


export const getEnvelopDefinition = async (
  projId: string,
): Promise<EnvelopeDefinition> => {
  const projectDetails = await getProjectDetails(projId);
  const custGrpDetails = await getCustomerGroup(
    projectDetails.custGroupId.value,
  );

  const {members} = custGrpDetails;

  const {
    customerName, address1,
    address2, postal, dump} = members.value[0].value;


  const {email} = JSON.parse(dump.value);

  if (!email) throw new Error('Invalid email.');

  const dsCustAddress: Text = {
    tabLabel: 'custAddress',
    value: `〒${postal.value} ${address1.value}${address2.value}`,
  };

  const dsCompanyAddress: Text = {
    tabLabel: 'companyAddress',
    value: `〒471-0041 愛知県豊田市汐見町2丁目87番地8`,
  };

  return {

    emailSubject: `【ここすも】工事請負変更契約書 ${customerName.value}`,
    templateId: templateIds.工事請負変更契約書,
    status: 'sent',
    templateRoles: [
      {
        'roleName': '発注者',
        'name': customerName.value,
        'email': <string>email,
        'tabs': {
          textTabs: [dsCustAddress],
        },
      },
      {
        'roleName': '受注者',
        'name': 'ここすも',
        'email': 'cocosumo.rpa03@gmail.com',
        'tabs': {
          textTabs: [dsCompanyAddress],
        },
      },
    ],
  };
};
