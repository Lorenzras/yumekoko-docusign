import {apiClient} from '../../config';
import {getJwtGrantToken} from './fetchAccessToken';

let userInfo: IGetUserInfoResponse | undefined;

export const getAccountId = async () => {
  const _userInfo = await getUserInfo();

  return _userInfo.accounts[0].accountId;
};

export const getUserInfo = async () => {
  if (!userInfo) {
    return await fetchUserInfo();
  }

  return userInfo;
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
