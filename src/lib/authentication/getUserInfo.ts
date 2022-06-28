import {apiClient} from '../../config';
import {getAccessToken} from './getAccessToken';

/**
 * Get user info.
 *
 * @returns {IGetUserInfoResponse} returns Userinfo
 */
export const getUserInfo = async () => {
  const {accessToken} = await getAccessToken();
  const userInfo: IGetUserInfoResponse = await apiClient
    .getUserInfo(accessToken);


  return userInfo;
};
