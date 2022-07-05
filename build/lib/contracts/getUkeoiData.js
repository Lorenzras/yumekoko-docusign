"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUkeoiData = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-len */
const kintone_1 = require("../../api/kintone");
const getCustomerGroup_1 = require("../../api/kintone/getCustomerGroup");
const getUkeoiData = (projId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { custGroupId, constructionName, postal: projPostal, address1: projAddress1, address2: projAddress2, dsEnvIdUkeoi, } = yield (0, kintone_1.getProjectDetails)(projId);
    const custGrpDetails = yield (0, getCustomerGroup_1.getCustomerGroup)(custGroupId.value);
    const { members } = custGrpDetails;
    const { customerName, address1, address2, postal, dump } = members.value[0].value;
    const { email } = JSON.parse(dump.value);
    if (!email)
        throw new Error('Invalid email.');
    const projData = {
        custEmail: email,
        custName: customerName.value,
        projId: projId,
        projName: constructionName.value,
        custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
        projLocation: `〒${projPostal.value} ${projAddress1.value}${projAddress2.value}`,
        repEmail: 'cocosumo.rpa03@gmail.com',
        repName: '高橋　加奈',
        envelopeId: dsEnvIdUkeoi.value,
    };
    return projData;
});
exports.getUkeoiData = getUkeoiData;
