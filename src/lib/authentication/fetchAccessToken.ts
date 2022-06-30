import {addSeconds, isPast, parse, parseISO, subMinutes} from 'date-fns';
import {
  getPrivateKey,
  integratorKey,
  userId,
  scopes,
  expiresIn,
  tokenReplaceMin,
  apiClient,
} from '../../config';

let jwtGrantToken: {
  accessToken: string,
  tokenCreated: Date,
  tokenExpirationTimestamp: Date
} | undefined;


/**
 *
 * Async function to obtain a accessToken via JWT grant
 *
 * RETURNS {accessToken, tokenExpirationTimestamp}
 *
 * We need a new accessToken. We will use the DocuSign SDK's function.
 */

export const fetchAccessToken = async () => {
  // moment().add(results.body.expires_in, 's').subtract(tokenReplaceMin, 'm')

  if (!jwtGrantToken) {
    const privateKey = await getPrivateKey();


    const results: IRequestJWTUserTokenResponse = await apiClient
      .requestJWTUserToken(
        integratorKey,
        userId,
        scopes,
        privateKey,
        expiresIn,
      );

    const tokenCreatedDT = new Date();
    const expiresAt = subMinutes(
      addSeconds(tokenCreatedDT, +results.body.expires_in),
      tokenReplaceMin,
    );

    apiClient.addDefaultHeader(
      'Authorization', `Bearer ${results.body.access_token}`,
    );


    jwtGrantToken = {
      accessToken: results.body.access_token,
      tokenCreated: tokenCreatedDT,
      tokenExpirationTimestamp: expiresAt,
    };
  }

  return jwtGrantToken;
};

export const getJwtGrantToken = async () => {
  // Generate token if expired
  if (
    !jwtGrantToken ||
    (jwtGrantToken && isPast(jwtGrantToken.tokenExpirationTimestamp))
  ) {
    return await fetchAccessToken();
  }

  return jwtGrantToken;
};

