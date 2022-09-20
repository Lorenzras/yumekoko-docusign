import {getProjectDetails} from '.';
import {getCustomerById} from './getCustomerById';
import {getCustomerGroup} from './getCustomerGroup';
import {getEstimateById} from './getEstimateById';
import {getUserByCode, getUserById} from './userApi';

export const getContractData = async ({
  projEstimateId, userCode,
} : {
  projEstimateId: string,
  userCode: string,
}) => {
  if (!projEstimateId) throw new Error('Invalid projEstimateid');

  /* 見積情報 */
  const {
    projId,
    contractPrice,
  } = await getEstimateById(projEstimateId);

  /* 工事情報 */
  const {
    custGroupId, constructionName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
  } = await getProjectDetails(projId.value);

  /* 顧客情報 */
  const {members} = await getCustomerGroup(custGroupId.value);
  const firstCustomer = members.value[0];
  const {customerId} = firstCustomer.value;
  const {
    fullName, contacts,
    address1, address2, postalCode,
  } = await getCustomerById(customerId.value);
  const {contactValue: email} = contacts.value
    .find(({value: {contactType}}) => contactType.value === 'email')
    ?.value ?? {};

  /* 担当情報 */
  const {
    email: officerEmail,
    name: officerName,
    customItemValues,
  } = await getUserByCode(userCode);

  /* 店長 */
  const {value: managerUserId} = customItemValues
    .find(({code}) => code === 'manager_0001' ) ?? {};

  const {
    email: managerEmail,
    name: managerName,
  } = await getUserById(managerUserId || '');

  /* 経理 */
  // どこから引っ張るかまだ分からないので、固定します。
  const accountingName = 'Temporary keiri';
  const accountingEmail = 'info@cocosumo.co.jp';

  return {

    /* 工事 */
    projId: projId.value,
    projEstimateId: projEstimateId,
    projName: constructionName.value,
    projLocation: `${projPostal.value}〒 ${projAddress1.value}${projAddress2.value}`,

    /* 契約 */
    contractPrice: contractPrice.value,

    /* 顧客 */
    custName: fullName.value,
    custAddress: `${postalCode.value}〒 ${address1.value}${address2.value}`,
    custEmail: email?.value,

    /* 担当者 */
    officerName: officerName,
    officerEmail: officerEmail,

    /* 店長 */
    storeMngrName: managerName,
    storeMngrEmail: managerEmail,

    /* 経理 */
    accountingName: accountingName,
    accountineEmail: accountingEmail,

  };
};
