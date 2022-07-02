/* eslint-disable max-len */
import {EnvelopeDefinition} from 'docusign-esign';

import {templateIds} from '../config/envelopeTemplates';

/**
 * @deprecated This was used for testing.
 *
 * @param args
 * @returns {object} Data
 */
export const getUkeoiKeiyakusho = async (
  args :
  {
    projId: string,
    custName: string,
    projName: string,
    companyRepName: string,
    companyEmail: string,
    email: string,
    status : 'sent' | 'created',
  },
) => {
  const {
    custName,
    email,
    projName,
    status,
    companyRepName,
    companyEmail,
  } = args;

  console.log(args);
  /*   const {
    custGroupId,
    constructionName,
  } = await getProjectDetails(projId); */


  /* const custGrpDetails = await getCustomerGroup(
    custGroupId.value,
  );

  const {members} = custGrpDetails;

  const {
    customerName, address1,
    address2, postal, dump} = members.value[0].value;

  const {email} = JSON.parse(dump.value);

  if (!email) throw new Error('Invalid email.'); */


  const envelope : EnvelopeDefinition = {
    emailSubject: `【ここすも】請負契約書 ${custName}様 ${projName}`,
    templateId: templateIds.請負契約書Static,
    status: 'sent',

    templateRoles: [
      {
        'roleName': '発注者',
        'name': custName,
        'email': email,
      },
      {
        'roleName': '受注者',
        'name': companyRepName,
        'email': companyEmail,
      },
    ],
  };

  return envelope;
};


/*
let list1 = docusign.List.constructFromObject({
  value: "green", documentId: "1", pageNumber: "1", tabLabel: "list"});

// Checkboxes
let check1 = docusign.Checkbox.constructFromObject({
      tabLabel: 'ckAuthorization', selected: "true"})
, check3 = docusign.Checkbox.constructFromObject({
      tabLabel: 'ckAgreement', selected: "true"});
// The NOde.js SDK has a bug so it cannot create a Number tab at this time.
//number1 = docusign.Number.constructFromObject({
//    tabLabel: "numbersOnly", value: '54321'});
let radioGroup = docusign.RadioGroup.constructFromObject({
      groupName: "radio1",
      // You only need to provide the radio entry for the entry you're selecting
      radios:
          [docusign.Radio.constructFromObject(
            {value: "white", selected: "true"})]
});
let text = docusign.Text.constructFromObject({
      tabLabel: "text", value: "Jabberwocky!"});

// We can also add a new tab (field) to the ones already in the template:
let textExtra = docusign.Text.constructFromObject({
      document_id: "1", page_number: "1",
      x_position: "280", y_position: "172",
      font: "helvetica", font_size: "size14", tab_label: "added text field",
      height: "23", width: "84", required: "false",
      bold: 'true', value: args.signerName,
      locked: 'false', tab_id: 'name'});

// Pull together the existing and new tabs in a Tabs object:
let tabs = docusign.Tabs.constructFromObject({
  checkboxTabs: [check1, check3], // numberTabs: [number1],
  radioGroupTabs: [radioGroup], textTabs: [text, textExtra],
  listTabs: [list1]
});
// Create the template role elements to connect the signer and cc recipients
// to the template
let signer = docusign.TemplateRole.constructFromObject({
      email: args.signerEmail, name: args.signerName,
      roleName: 'signer',
      clientUserId: args.signerClientId, // change the signer to be embedded
      tabs: tabs // Set tab values
});
// Create a cc template role.
let cc = docusign.TemplateRole.constructFromObject({
      email: args.ccEmail, name: args.ccName,
      roleName: 'cc'
});
// Add the TemplateRole objects to the envelope object
envelopeDefinition.templateRoles = [signer, cc];
// Create an envelope custom field to save the our application's
// data about the envelope
let customField = docusign.TextCustomField.constructFromObject({
      name: 'app metadata item',
      required: 'false',
      show: 'true', // Yes, include in the CoC
      value: '1234567'})
, customFields = docusign.CustomFields.constructFromObject({
      textCustomFields: [customField]});
envelopeDefinition.customFields = customFields;

return envelopeDefinition; */
