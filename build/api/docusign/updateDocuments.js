"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocuments = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-len */
const docusign_esign_1 = require("docusign-esign");
const config_1 = require("../../config");
const fetchUserInfo_1 = require("../../lib/authentication/fetchUserInfo");
const updateDocuments = ({ envelopeId, envelope, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const accountId = yield (0, fetchUserInfo_1.getAccountId)();
    const envApi = new docusign_esign_1.EnvelopesApi(config_1.apiClient);
    // https://docusign.github.io/docusign-esign-node-client/module-api_EnvelopesApi.html#updateDocuments
    const result = yield envApi.updateDocuments(accountId, envelopeId, { envelopeDefinition: envelope });
    return result;
});
exports.updateDocuments = updateDocuments;
