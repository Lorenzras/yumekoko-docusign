"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
(async () => {
    const privateKey = await (0, config_1.getPrivateKey)();
    console.log(config_1.scopes);
    // IMPORTANT NOTE:
    // the first time you ask for a JWT access token,
    // you should grant access by making the following call
    // get DocuSign OAuth authorization url:
    const oauthLoginUrl = config_1.apiClient
        .getJWTUri(config_1.integratorKey, config_1.redirectURI, config_1.oAuthBasePath);
    console.log(oauthLoginUrl);
    /* const jwtUserToken = await apiClient
      .requestJWTUserToken(
        integratorKey,
        userId,
        scopes,
        privateKey,
        expiresIn,
      ); */
    const jwtAppToken = await config_1.apiClient
        .requestJWTApplicationToken(config_1.integratorKey, config_1.scopes, privateKey, config_1.expiresIn);
    console.log(jwtAppToken.body.access_token);
})();
