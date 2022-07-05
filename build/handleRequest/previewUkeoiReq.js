"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewUkeoiReq = void 0;
const tslib_1 = require("tslib");
const docusign_esign_1 = require("docusign-esign");
const processUkeoi_1 = require("../lib/contracts/processUkeoi");
const config_1 = require("../config");
const arrayToBase64_1 = require("./../utils/arrayToBase64");
/**
 * Sends Image preview to the client.
 *
 * @param req
 * @param res
 */
const previewUkeoiReq = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { projId } = req.body;
    if (projId) {
        //  const data = await getUkeoiData(projId);
        let result;
        const envelope = yield (0, processUkeoi_1.processUkeoi)(projId, 'created');
        if ('error' in envelope) {
            res.status(400).send(envelope.error);
        }
        else {
            const { accountId, envelopeId } = envelope;
            const envAPI = new docusign_esign_1.EnvelopesApi(config_1.apiClient);
            if (envelopeId) {
                result = (yield envAPI.getDocumentPageImage(accountId, envelopeId, '1', '1'));
                res.status(200).send((0, arrayToBase64_1.arrayToBase64)(result));
            }
        }
    }
    else {
        res.status(501).send('Invalid project id.').end();
    }
});
exports.previewUkeoiReq = previewUkeoiReq;
