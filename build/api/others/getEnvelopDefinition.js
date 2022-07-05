"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvelopDefinition = void 0;
const tslib_1 = require("tslib");
const envelopeTemplates_1 = require("../../config/envelopeTemplates");
const kintone_1 = require("../kintone");
const getCustomerGroup_1 = require("../kintone/getCustomerGroup");
const getEnvelopDefinition = (projId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const projectDetails = yield (0, kintone_1.getProjectDetails)(projId);
    const custGrpDetails = yield (0, getCustomerGroup_1.getCustomerGroup)(projectDetails.custGroupId.value);
    const { members } = custGrpDetails;
    const { customerName, address1, address2, postal, dump } = members.value[0].value;
    const { email } = JSON.parse(dump.value);
    if (!email)
        throw new Error('Invalid email.');
    const dsCustAddress = {
        tabLabel: 'custAddress',
        value: `〒${postal.value} ${address1.value}${address2.value}`,
    };
    const dsCompanyAddress = {
        tabLabel: 'companyAddress',
        value: `〒471-0041 愛知県豊田市汐見町2丁目87番地8`,
    };
    return {
        emailSubject: `【ここすも】工事請負変更契約書 ${customerName.value}`,
        templateId: envelopeTemplates_1.templateIds.工事請負変更契約書,
        status: 'sent',
        templateRoles: [
            {
                'roleName': '発注者',
                'name': customerName.value,
                'email': email,
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
});
exports.getEnvelopDefinition = getEnvelopDefinition;
