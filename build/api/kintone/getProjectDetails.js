"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectDetails = void 0;
const tslib_1 = require("tslib");
const config_1 = require("./config");
const getProjectDetails = (projId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!projId)
        throw new Error('Invalid ProjId');
    return yield config_1.KintoneRecord.getRecord({
        app: config_1.APPIDS.projectDetails,
        id: projId,
    }).then((resp) => resp.record);
});
exports.getProjectDetails = getProjectDetails;
