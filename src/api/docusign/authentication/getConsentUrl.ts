/* eslint-disable max-len */
import {integratorKey, oAuthBasePath} from '../../../config';

const SCOPES = [
  'signature', 'impersonation',
].join('+');

export const getConsentUrl = () => `https://${oAuthBasePath}/oauth/auth?response_type=code&` +
`scope=${SCOPES}&client_id=${integratorKey}&` +
`redirect_uri=${'http://localhost:8080/ds/callback'}`;
