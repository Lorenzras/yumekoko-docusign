"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerGroup = void 0;
const tslib_1 = require("tslib");
const config_1 = require("./config");
const getCustomerGroup = (custGrpId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!custGrpId)
        throw new Error('Invalid ProjId');
    return yield config_1.KintoneRecord.getRecord({
        app: config_1.APPIDS.custGroup,
        id: custGrpId,
    }).then((resp) => resp.record);
});
exports.getCustomerGroup = getCustomerGroup;
