"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvelope = void 0;
const tslib_1 = require("tslib");
const docusign_esign_1 = require("docusign-esign");
const config_1 = require("../../config");
const getEnvelope = (accountId, envelopeId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const envApi = new docusign_esign_1.EnvelopesApi(config_1.apiClient);
    return yield envApi.getEnvelope(accountId, envelopeId, null);
});
exports.getEnvelope = getEnvelope;
