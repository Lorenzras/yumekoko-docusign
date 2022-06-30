"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnvelopeFromFile = void 0;
const tslib_1 = require("tslib");
const makeEnvelope_1 = require("./helpers/makeEnvelope");
const docusign_esign_1 = tslib_1.__importDefault(require("docusign-esign"));
const config_1 = require("../../config");
const createEnvelopeFromFile = (args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const envelopesApi = new docusign_esign_1.default.EnvelopesApi(config_1.apiClient);
    // Step 1. Make the envelope request body
    const envelope = yield (0, makeEnvelope_1.makeEnvelope)({
        signerEmail: 'lenzras@gmail.com',
        signerName: 'Lorenz Ras',
        ccEmail: 'cocosumo.rpa03@gmail.com',
        ccName: 'RPA03',
        filePath: args.filePath,
        status: 'sent',
    });
    // Step 2. call Envelopes::create API method
    // Exceptions will be caught by the calling function
    const results = yield envelopesApi.createEnvelope(args.accountId, {
        envelopeDefinition: envelope,
    });
    console.log(results);
    const envelopeId = results.envelopeId;
    console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
    return { envelopeId: envelopeId };
});
exports.createEnvelopeFromFile = createEnvelopeFromFile;
