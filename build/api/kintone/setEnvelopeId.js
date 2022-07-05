"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnvelopeId = void 0;
const tslib_1 = require("tslib");
const config_1 = require("./config");
const setEnvelopeId = (projId, envelopeId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const record = {
        dsEnvIdUkeoi: { value: envelopeId },
    };
    return yield config_1.KintoneRecord.updateRecord({
        app: config_1.APPIDS.constructionDetails,
        id: projId,
        record: record,
    });
});
exports.setEnvelopeId = setEnvelopeId;
