"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUkeoi = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-len */
const docusign_esign_1 = require("docusign-esign");
const fetchUserInfo_1 = require("../authentication/fetchUserInfo");
const config_1 = require("../../config");
const makeUkeoiEnvelope_1 = require("./makeUkeoiEnvelope");
const getUkeoiData_1 = require("./getUkeoiData");
const getEnvelope_1 = require("../../api/docusign/getEnvelope");
const updateDocuments_1 = require("../../api/docusign/updateDocuments");
const setEnvelopeId_1 = require("../../api/kintone/setEnvelopeId");
/**
 * Creates or updates envelope of the defined project Id
 *
 * @param projId The project where to base envelope's update and create methods
 * @param status https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/recipients/
 * @returns {EnvelopeSummary} Envelope summary and account id.
 */
const processUkeoi = (projId, status = 'sent') => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = yield (0, fetchUserInfo_1.getAccountId)();
        const data = yield (0, getUkeoiData_1.getUkeoiData)(projId);
        const envelopesApi = new docusign_esign_1.EnvelopesApi(config_1.apiClient);
        const envelope = yield (0, makeUkeoiEnvelope_1.makeUkeoiEnvelope)(data, status);
        let results;
        if (data.envelopeId) {
            console.log('Already have envelope Id');
            const { status } = yield (0, getEnvelope_1.getEnvelope)(accountId, data.envelopeId);
            console.log('Status is', status);
            if (status === 'sent')
                throw new Error('Can not modify sent data');
            results = yield (0, updateDocuments_1.updateDocuments)({
                envelope,
                envelopeId: data.envelopeId,
            });
        }
        else {
            results = yield envelopesApi.createEnvelope(accountId, {
                envelopeDefinition: envelope,
            });
            yield (0, setEnvelopeId_1.setEnvelopeId)(projId, data.envelopeId);
        }
        return Object.assign(Object.assign({}, results), { accountId });
    }
    catch (err) {
        return { error: err.message };
    }
});
exports.processUkeoi = processUkeoi;
