import docusign from 'docusign-esign';
import {
  getPrivateKey,
  integratorKey,
  userId,
  basePath,
  oAuth, oAuthBasePath,
  restApi, scopes,
  redirectURI, expiresIn,
  apiClient,
} from './config';


(async ()=>{
  const privateKey = await getPrivateKey();


  console.log( scopes);
  // IMPORTANT NOTE:
  // the first time you ask for a JWT access token,
  // you should grant access by making the following call
  // get DocuSign OAuth authorization url:
  const oauthLoginUrl = apiClient
    .getJWTUri(integratorKey, redirectURI, oAuthBasePath);
  console.log(oauthLoginUrl);

  /* const jwtUserToken = await apiClient
    .requestJWTUserToken(
      integratorKey,
      userId,
      scopes,
      privateKey,
      expiresIn,
    ); */

  /*   const jwtAppToken = await apiClient
    .requestJWTApplicationToken
    (integratorKey, scopes, privateKey, expiresIn); */

  /*   const responseType = apiClient.set ;
  const scopes = [apiClient.OAuth.Scope.EXTENDED];
  const randomState = '*^.$DGj*)+}Jk';
  const authUri = apiClient.getAuthorizationUri
  (integratorKeyAuthCode, scopes, RedirectURI, responseType, randomState);
 */
  // console.log(jwtAppToken.body.access_token);
})();


