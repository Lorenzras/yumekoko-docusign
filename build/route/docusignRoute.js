"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const envelopeTemplates_1 = require("./../config/envelopeTemplates");
const createEnvelopeFromTemplate_1 = require("./../lib/esignature/createEnvelopeFromTemplate");
const express_1 = require("express");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const fetchUserInfo_1 = require("../lib/authentication/fetchUserInfo");
const route = (0, express_1.Router)();
route.use(body_parser_1.default.urlencoded({ extended: true }));
route.get('/', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const accountId = yield (0, fetchUserInfo_1.getAccountId)();
    const result = yield (0, createEnvelopeFromTemplate_1.createEnvelopeFromTemplate)({
        accountId,
        envelope: {
            emailSubject: 'テンプレートから送信しました',
            templateId: envelopeTemplates_1.templateIds.test,
            status: 'sent',
            templateRoles: [
                {
                    'roleName': 'Signer1',
                    'name': 's1',
                    'email': 'lenzras@gmail.com'
                },
                {
                    'roleName': 'CC1',
                    'name': 'cc1',
                    'email': 'cocosumo.rpa03@gmail.com',
                },
            ],
        },
    });
    res.status(200).json(result);
}));
exports.default = route;
