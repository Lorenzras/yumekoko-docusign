"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserInfo = exports.getUserInfo = exports.getAccountId = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const fetchAccessToken_1 = require("./fetchAccessToken");
let userInfo;
const getAccountId = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const _userInfo = yield (0, exports.getUserInfo)();
    return _userInfo.accounts[0].accountId;
});
exports.getAccountId = getAccountId;
const getUserInfo = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!userInfo) {
        return yield (0, exports.fetchUserInfo)();
    }
    return userInfo;
});
exports.getUserInfo = getUserInfo;
/**
 * Get user info.
 *
 * @returns {IGetUserInfoResponse} returns Userinfo
 */
const fetchUserInfo = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const jwtGrantToken = yield (0, fetchAccessToken_1.getJwtGrantToken)();
    userInfo = yield config_1.apiClient
        .getUserInfo(jwtGrantToken.accessToken);
    return userInfo;
});
exports.fetchUserInfo = fetchUserInfo;
