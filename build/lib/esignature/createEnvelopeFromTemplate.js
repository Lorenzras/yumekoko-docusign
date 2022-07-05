"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnvelopeFromTemplate = void 0;
const tslib_1 = require("tslib");
const settings_1 = require("../../config/settings");
const docusign_esign_1 = require("docusign-esign");
/**
 * Send envelope by template
 *
 * @param args
 * @returns {envelopId} Object containing envelopeId
 */
const createEnvelopeFromTemplate = (args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountId, envelope } = args;
        console.log(args);
        const envelopesApi = new docusign_esign_1.EnvelopesApi(settings_1.apiClient);
        const results = yield envelopesApi.createEnvelope(accountId, {
            envelopeDefinition: envelope,
        });
        const envelopeId = results.envelopeId;
        console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
        return {
            envelopeId: envelopeId,
            envelopesApi,
        };
    }
    catch (err) {
        throw new Error(`Error ${err}`);
    }
});
exports.createEnvelopeFromTemplate = createEnvelopeFromTemplate;
