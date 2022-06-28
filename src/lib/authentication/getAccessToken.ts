import {addSeconds, subMinutes} from 'date-fns';
import {
  getPrivateKey,
  integratorKey,
  userId,
  scopes,
  expiresIn,
  tokenReplaceMin,
  apiClient,
} from '../../config';

/**
 *
 * Async function to obtain a accessToken via JWT grant
 *
 * RETURNS {accessToken, tokenExpirationTimestamp}
 *
 * We need a new accessToken. We will use the DocuSign SDK's function.
 */

export const getAccessToken = async () => {
  // moment().add(results.body.expires_in, 's').subtract(tokenReplaceMin, 'm')

  const privateKey = await getPrivateKey();


  const results: IRequestJWTUserTokenResponse = await apiClient
    .requestJWTUserToken(
      integratorKey,
      userId,
      scopes,
      privateKey,
      expiresIn,
    );

  const expiresAt = subMinutes(
    addSeconds(new Date(), +results.body.expires_in),
    tokenReplaceMin,
  );

  apiClient.addDefaultHeader(
    'Authorization', `Bearer ${results.body.access_token}`,
  );


  return {
    accessToken: results.body.access_token,
    tokenExpirationTimestamp: expiresAt,
  };
};

/* DsJwtAuth.prototype.getToken = async function _getToken() {
    // Data used
    // dsConfig.dsClientId
    // dsConfig.impersonatedUserGuid
    // dsConfig.privateKey
    // dsConfig.dsOauthServer

    const jwtLifeSec = 10 * 60, // requested lifetime for the JWT is 10 min
        dsApi = new docusign.ApiClient();
    dsApi.setOAuthBasePath(dsConfig.dsOauthServer.replace('https://', '')); // it should be domain only.
    const results = await dsApi.requestJWTUserToken(dsConfig.dsClientId,
        dsConfig.impersonatedUserGuid, this.scopes, rsaKey,
        jwtLifeSec);

    const expiresAt = moment().add(results.body.expires_in, 's').
    subtract(tokenReplaceMin, 'm');
    this.accessToken = results.body.access_token;
    this._tokenExpiration = expiresAt;
    return {
        accessToken: results.body.access_token,
        tokenExpirationTimestamp: expiresAt
    };
} */
