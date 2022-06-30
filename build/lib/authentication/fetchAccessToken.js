"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtGrantToken = exports.fetchAccessToken = void 0;
const tslib_1 = require("tslib");
const date_fns_1 = require("date-fns");
const config_1 = require("../../config");
let jwtGrantToken;
/**
 *
 * Async function to obtain a accessToken via JWT grant
 *
 * RETURNS {accessToken, tokenExpirationTimestamp}
 *
 * We need a new accessToken. We will use the DocuSign SDK's function.
 */
const fetchAccessToken = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // moment().add(results.body.expires_in, 's').subtract(tokenReplaceMin, 'm')
    if (!jwtGrantToken) {
        const privateKey = yield (0, config_1.getPrivateKey)();
        const results = yield config_1.apiClient
            .requestJWTUserToken(config_1.integratorKey, config_1.userId, config_1.scopes, privateKey, config_1.expiresIn);
        const expiresAt = (0, date_fns_1.subMinutes)((0, date_fns_1.addSeconds)(new Date(), +results.body.expires_in), config_1.tokenReplaceMin);
        config_1.apiClient.addDefaultHeader('Authorization', `Bearer ${results.body.access_token}`);
        jwtGrantToken = {
            accessToken: results.body.access_token,
            tokenExpirationTimestamp: expiresAt,
        };
    }
    return jwtGrantToken;
});
exports.fetchAccessToken = fetchAccessToken;
const getJwtGrantToken = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!jwtGrantToken) {
        return yield (0, exports.fetchAccessToken)();
    }
    return jwtGrantToken;
});
exports.getJwtGrantToken = getJwtGrantToken;
