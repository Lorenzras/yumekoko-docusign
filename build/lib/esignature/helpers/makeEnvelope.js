"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEnvelope = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const makeEnvelope = (args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(args);
    const fileByte = yield promises_1.default.readFile(args.filePath);
    const docB64 = Buffer.from(fileByte).toString('base64');
    const doc = {
        documentBase64: docB64,
        name: 'テスト',
        fileExtension: 'pdf',
        documentId: '1',
    };
    const signHere = {
        anchorString: 'sign',
        documentId: '1',
        recipientId: '1',
        pageNumber: '1',
        tabLabel: 'Sig1',
    };
    const signerTabs = {
        signHereTabs: [signHere],
    };
    const signer = {
        email: args.signerEmail,
        name: args.signerName,
        recipientId: '1',
        routingOrder: '1',
        tabs: signerTabs,
    };
    const cc = {
        email: args.ccEmail,
        name: args.ccName,
        routingOrder: '2',
        recipientId: '2',
    };
    const recipients = {
        signers: [signer],
        carbonCopies: [cc],
    };
    const env = {
        emailSubject: 'Please sign this document set',
        documents: [doc],
        recipients: recipients,
        status: args.status,
    };
    return env;
});
exports.makeEnvelope = makeEnvelope;
