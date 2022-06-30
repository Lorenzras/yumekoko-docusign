"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = exports.scopes = exports.userId = exports.integratorKey = exports.getPrivateKey = exports.tokenReplaceMin = exports.expiresIn = exports.redirectURI = exports.oAuthBasePath = exports.basePath = exports.restApi = exports.oAuth = exports.ds = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const docusign_esign_1 = tslib_1.__importDefault(require("docusign-esign"));
dotenv_1.default.config();
exports.ds = docusign_esign_1.default;
exports.oAuth = exports.ds.ApiClient.OAuth;
exports.restApi = exports.ds.ApiClient.RestApi;
exports.basePath = exports.restApi.BasePath.DEMO;
exports.oAuthBasePath = exports.oAuth.BasePath.DEMO;
exports.redirectURI = 'http://localhost';
exports.expiresIn = 10 * 60;
exports.tokenReplaceMin = 10;
const getPrivateKey = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield promises_1.default
        .readFile(path_1.default.join(__dirname, 'keys', 'private.key'));
});
exports.getPrivateKey = getPrivateKey;
exports.integratorKey = process.env.DS_INTEGRATOR_KEY;
exports.userId = process.env.DS_USER_ID;
exports.scopes = [
    exports.oAuth.Scope.IMPERSONATION,
    exports.oAuth.Scope.SIGNATURE,
];
exports.apiClient = new exports.ds.ApiClient({
    basePath: exports.basePath,
    oAuthBasePath: exports.oAuthBasePath,
});
