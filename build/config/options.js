"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = exports.scopes = exports.userId = exports.integratorKey = exports.getPrivateKey = exports.expiresIn = exports.redirectURI = exports.oAuthBasePath = exports.basePath = exports.restApi = exports.oAuth = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("fs/promises"));
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const docusign_esign_1 = tslib_1.__importDefault(require("docusign-esign"));
dotenv_1.default.config();
exports.oAuth = docusign_esign_1.default.ApiClient.OAuth;
exports.restApi = docusign_esign_1.default.ApiClient.RestApi;
exports.basePath = exports.restApi.BasePath.DEMO;
exports.oAuthBasePath = exports.oAuth.BasePath.DEMO;
exports.redirectURI = 'http://localhost';
exports.expiresIn = 3600;
const getPrivateKey = async () => {
    return await promises_1.default
        .readFile(path_1.default.join(__dirname, 'keys', 'private.key'));
};
exports.getPrivateKey = getPrivateKey;
exports.integratorKey = process.env.DS_INTEGRATOR_KEY;
exports.userId = '9169dfa2-cb51-47e7-bf93-da59d152da90';
exports.scopes = [
    exports.oAuth.Scope.IMPERSONATION,
    exports.oAuth.Scope.SIGNATURE,
];
exports.apiClient = new docusign_esign_1.default.ApiClient({
    basePath: exports.basePath,
    oAuthBasePath: exports.oAuthBasePath,
});
