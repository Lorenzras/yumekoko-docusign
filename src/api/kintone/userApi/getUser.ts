import {getUsers} from './getUsers';

/* Wrapper functions */

/**
 * Warning: Administrator account may not be supported ~ ras
 *
 */

export const getUserByCode = async (code: string) =>
  (await getUsers({codes: code})).users[0];

export const getUserById = async (id: string | number) =>
  (await getUsers({ids: +id})).users[0];
