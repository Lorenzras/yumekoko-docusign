import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import docusign from 'docusign-esign';


dotenv.config();


export const ds = docusign;
export const oAuth = ds.ApiClient.OAuth;
export const restApi = ds.ApiClient.RestApi;

export const basePath = restApi.BasePath.DEMO;
export const oAuthBasePath = oAuth.BasePath.DEMO;
export const redirectURI = 'http://localhost';
export const expiresIn = 10 * 60;
export const tokenReplaceMin = 10;


export const getPrivateKey = async () => {
  return await fs
    .readFile(
      path.join(__dirname, 'keys', 'private.key'),
    );
};

export const integratorKey = <string>process.env.DS_INTEGRATOR_KEY;
export const userId = <string>process.env.DS_USER_ID;
export const scopes = [
  oAuth.Scope.IMPERSONATION,
  oAuth.Scope.SIGNATURE,
];
export const apiClient = new ds.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,

});

