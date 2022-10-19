import {getProjectDetails} from '.';
import {calculateEstimateRecord} from './calculations/calculateEstimateRecord';
import {getCustomerById} from './getCustomerById';
import {getCustomerGroup} from './getCustomerGroup';
import {getCustomersByIds} from './getCustomersByGroupId';
import {getEmployeesByIds} from './getEmployeesByIds';
import {getEstimateById} from './getEstimateById';
import {getStoreMngrByStoreId} from './getStoreMngrByStoreId';
import {validateContractData} from './validateContractData';

export type TContractData = Awaited<ReturnType<typeof getContractData>>

/**
 * Get Contract data across all involved database
 *
 * @param param
 * @param param.projEstimateId 見積番号
 * @param param.userCode Kintoneのユーザコード
 * @param isValidate Whether to validate or not. Default: false
 * @returns {TContractData} 契約に必要になるデータ
 */
export const getContractData = async ({
  projEstimateId,
} : {
  projEstimateId: string,
  userCode: string,
},
isValidate = false,

) => {
  if (!projEstimateId) throw new Error('Invalid projEstimateId');

  /* 見積情報 */
  const estimatedRecord = await getEstimateById(projEstimateId);
  const {
    projId,
    totalPaymentAmt,
    envStatus,
    envId,
    支払い,
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    completeDate,
    payMethod,
    payDestination,
    signMethod,
  } = estimatedRecord;

  const calculatedEstimates = await calculateEstimateRecord(estimatedRecord);

  /* 工事情報 */
  const {
    custGroupId, projName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
  } = await getProjectDetails(projId.value);

  /* 顧客情報 */
  const {
    agents,
    members,
    storeId,
  } = await getCustomerGroup(custGroupId.value);

  const custIds = members.value
    .map(({value: {customerId}}) => customerId.value );

  const rawCustomers = await getCustomersByIds(custIds);

  /* 顧客全員 */
  const customers = rawCustomers.map(({
    fullName,
    contacts,
    postalCode,
    address1,
    address2,
  }) => {
    return {
      custName: fullName.value,
      email: contacts.value
        .find(({value: {contactType}}) => contactType.value === 'email')
        ?.value.contactValue.value,
      address: `${postalCode.value}〒 ${address1.value}${address2.value}`,
      postalCode: postalCode.value,
      address1: address1.value,
      address2: address2.value,
    };
  });


  console.log(customers);


  /* 担当情報 */
  const cocoAgIds = agents.value
    .filter(({value: {agentType}}) => (
      (agentType.value as AgentType) === 'cocoAG'))
    .map(({value: {employeeId}}) => employeeId.value );
  const cocoAG = (await getEmployeesByIds(cocoAgIds))
    .map(({文字列＿氏名: empName, email: empEmail}) => ({
      name: empName.value,
      email: empEmail.value,
    }) );

  /* 店長 */
  const {
    文字列＿氏名: managerName,
    email: managerEmail,
  } = await getStoreMngrByStoreId(storeId.value);

  /* 経理 */
  // どこから引っ張るかまだ分からないので、固定します。
  const accountingName = 'Temporary keiri';
  const accountingEmail = 'info@cocosumo.co.jp';

  /* 支払い */
  const payments = 支払い.value?.map(({value: {
    isPayEnabled,
    paymentAmt,
    paymentDate,
    paymentType,
  }}) => {
    return {
      isPayEnabled: Boolean(+isPayEnabled.value),
      paymentAmt: +paymentAmt?.value || 0,
      paymentDate: paymentDate?.value || '',
      paymentType: paymentType?.value || '',
    };
  }) ?? [];

  const data = {

    /* 工事 */
    projId: projId.value,
    projEstimateId: projEstimateId,
    projName: projName.value,
    projLocation: `${projPostal.value}〒 ${projAddress1.value}${projAddress2.value}`,

    /* 契約 */
    contractPrice: totalPaymentAmt.value,
    envelopeId: envId.value,
    signMethod: signMethod.value as TSignMethod,

    /* 顧客 */
    customers,

    /* 担当者 */
    cocoAG,

    /* 店長 */
    storeMngrName: managerName.value,
    storeMngrEmail: managerEmail.value,

    /* 経理 */
    accountingName: accountingName,
    accountingEmail: accountingEmail,

    /* 契約関連 */
    envelopeStatus: envStatus.value,

    /* 工期 */
    startDate: startDate.value,
    startDaysAfterContract: startDaysAfterContract.value,
    finishDate: finishDate.value,
    finishDaysAfterContract: finishDaysAfterContract.value,
    completeDate: completeDate.value,

    /* 支払い */
    payments,
    payDestination: payDestination.value,
    payMethod: payMethod.value as '持参' | '集金' | '振込',

    /* 計算 */
    calculatedEstimates,
  };

  if (isValidate) validateContractData(data);

  return data;
};
