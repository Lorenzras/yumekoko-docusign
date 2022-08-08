"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KintoneRecord = exports.KintoneClient = exports.APPIDS = void 0;
const rest_api_client_1 = require("@kintone/rest-api-client");
const options = {
    baseUrl: process.env.KT_BASE_URL,
    auth: {
        apiToken: [
            process.env.KT_CUSTGROUP_TOKEN,
            process.env.KT_PROJECT_TOKEN,
        ],
    },
};
var APPIDS;
(function (APPIDS) {
    APPIDS[APPIDS["customers"] = 173] = "customers";
    APPIDS[APPIDS["stores"] = 19] = "stores";
    APPIDS[APPIDS["employees"] = 34] = "employees";
    APPIDS[APPIDS["custGroup"] = 185] = "custGroup";
    APPIDS[APPIDS["custMemo"] = 181] = "custMemo";
    APPIDS[APPIDS["constructionType"] = 190] = "constructionType";
    APPIDS[APPIDS["ProjectDetails"] = 194] = "ProjectDetails";
})(APPIDS = exports.APPIDS || (exports.APPIDS = {}));
exports.KintoneClient = new rest_api_client_1.KintoneRestAPIClient(options);
exports.KintoneRecord = exports.KintoneClient.record;
exports.default = exports.KintoneClient;
