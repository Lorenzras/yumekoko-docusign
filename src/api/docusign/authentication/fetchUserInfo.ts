
import {apiClient} from '../../../config';
import {getJwtGrantToken} from './fetchAccessToken';

let userInfo: IGetUserInfoResponse | undefined;

export const getAccountId = async () => {
  const _userInfo = await fetchUserInfo();

  return _userInfo.accounts[0].accountId;
};


/**
 * Get user info.
 *
 * @returns {IGetUserInfoResponse} returns Userinfo
 */
export const fetchUserInfo = async () => {
  const jwtGrantToken = await getJwtGrantToken();

  userInfo = await apiClient
    .getUserInfo(jwtGrantToken.accessToken);

  return userInfo as IGetUserInfoResponse;
};
