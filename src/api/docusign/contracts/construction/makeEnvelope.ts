import {EnvelopeDefinition, Signer} from 'docusign-esign';
import {getContractData} from '../../../kintone/getContractData';
import {generateContractPdf} from './generateContractPdf';

/*  Test emails */

const testTantouEmail = 'yumecoco.rpa05@gmail.com'; // 担当
const testTenchoEmail = 'contact@yumetetsu.jp'; // 店長
const testKeiriEmail = 'info@cocosumo.co.jp'; // 経理

/* Need to improve this where it gets deleted when transpiled */
const isProd = process.env.NODE_ENV !== 'test';

export const makeEnvelope = async (
  data: Awaited<ReturnType<typeof getContractData>>,
  status: 'created' | 'sent' = 'sent') => {
  const {
    custEmail,
    custName,
    cocoAG,
    projName,

    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,
  } = data;

  const {
    email: officerEmail,
    name: officerName,
  } = cocoAG?.[0] ?? {};

  console.log(data);

  const documentBase64 = await generateContractPdf(data, 'base64') as string;

  /* 担当者 */
  const officerSinger: Signer = {
    email: isProd ? officerEmail :testTantouEmail,
    name: officerName,
    roleName: '担当者',
    recipientId: '1',
    routingOrder: '1',
    tabs: {
      signHereTabs: [{
        anchorString: '/sC/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: 'sC',
      }],
    },
  };


  /* 顧客署名 */
  const customerSigner: Signer = {
    email: custEmail,
    name: custName,
    roleName: '顧客',
    recipientId: '2',
    routingOrder: '2',
    tabs: {
      signHereTabs: [{
        anchorString: '/sH/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: 'sH',
      }],
    },
  };

  /* 店長 */
  const tenchoSigner: Signer = {
    email: isProd ? storeMngrEmail : testTenchoEmail,
    name: storeMngrName,
    roleName: '店長',
    recipientId: '3',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/aT/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: 'aT',
      }],
    },
  };

  /* 経理 */
  const accountingSigner: Signer = {
    email: isProd ? accountingEmail : testKeiriEmail,
    name: accountingName,
    roleName: '経理',
    recipientId: '33',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/kT/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: 'kT',
      }],
    },
  };


  const env: EnvelopeDefinition = {
    emailSubject: `【${projName}】サインをお願いします。`,
    documents: [
      {
        documentBase64: documentBase64,
        name: '請負契約書',
        fileExtension: 'pdf',
        documentId: '1',

      },
    ],
    recipients: {
      signers: [
        customerSigner, // 顧客
        officerSinger, // 担当者
        tenchoSigner, // 店長,
        accountingSigner, // 経理
      ],
    },
    status: status,
  };

  return env;
};
