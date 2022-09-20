import axios from 'axios';
import {KintoneClient} from '../config';

/**
 * Kintone may have typings already available.
 */

interface IUser {
  birthDate: string | null,
  callto: string,
  code: string,
  ctime: string,
  customItemValues: Array< {
    code: string,
    value: string,
  } >,
  description: string,
  email: string,
  employeeNumber: string,
  extensionNumber: string,
  givenName: string,
  givenNameReading: string,
  id: string,
  joinDate: string | null,
  localName: string,
  localNameLocale: string,
  locale: string,
  mobilePhone: string,
  mtime: string,
  name: string,
  phone: string,
  primaryOrganization: string,
  sortOrder: string | null,
  surName: string,
  surNameReading: string,
  timezone: string,
  url: string,
  valid: true,

}

interface IGetUsersResult {
  users: IUser[]
}


/**
 * Get kintone users by ids.
 * https://kintone.dev/en/docs/common/user-api/users/get-users/
 *
 * @param obj if not defined, will retrieve all users
 * @returns {Promise<IGetUsersResult>} user api's return type
 */
export const getUsers = async ({
  ids, codes,
}: {
  ids?: number[] | number,
  codes?: string[] | string,
}) => {
  try {
    const baseUrl = `${KintoneClient.getBaseUrl()}`;
    const api = `/v1/users.json`;
    const endpoint = `${baseUrl}${api}`;

    const auth = process.env.KT_B64_AUTH;

    if (!auth) throw new Error('Invalid authentication.');

    const cleanIds = ids ? ([] as number[]).concat(ids) : ids;
    const cleanCodes = codes ? ([] as string[]).concat(codes) : codes;

    const {status, data} = await axios({
      url: endpoint,
      method: 'get',
      data: {
        ids: cleanIds,
        codes: cleanCodes,
      },
      headers: {
        'X-Cybozu-Authorization': auth,
      },
    });

    if (status === 200) {
      return data as IGetUsersResult;
    } else {
      throw new Error(`Request failed. status: ${status} ${data}`);
    }
  } catch (err: any) {
    throw new Error(`getUsers: ${err?.response?.data?.message}`);
  }
};
