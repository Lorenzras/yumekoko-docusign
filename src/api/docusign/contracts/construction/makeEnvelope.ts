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
  status: 'created' | 'sent' = 'sent',
  signMethod: ReqSendContract['signMethod'],
) => {
  const {
    customers,
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

  const documentBase64 = await generateContractPdf(data, 'base64') as string;

  const signers : Signer[] = [];

  /* 電子署名の場合 */
  if (signMethod === 'electronic') {
    /* 顧客 */
    signers.push(...customers
      .map<Signer>(
      (
        {
          custName,
          email: custEmail,
        },
        idx,
      ) => {
        return {
          email: custEmail,
          name: custName,
          roleName: '顧客',
          recipientId: `${1}${idx}`,
          routingOrder: '1',
          tabs: {
            signHereTabs: [{
              anchorString: `c${idx + 1}`,
              anchorYOffset: '5',
              scaleValue: '66',
              documentId: '1',
              pageNumber: '1',
              tabLabel: 'c',
            }],
          },
        };
      }));

    /* 担当者 */
    signers.push({
      email: isProd ? officerEmail :testTantouEmail,
      name: officerName,
      roleName: '担当者',
      recipientId: '2',
      routingOrder: '2',
      tabs: {
        approveTabs: [{
          anchorString: '/tt/',
          documentId: '1',
          pageNumber: '1',
          tabLabel: '担当者',
        }],
      },
    });
  } else {
    /* 紙契約の場合 */
    signers.push({
      email: isProd ? officerEmail :testTantouEmail,
      name: officerName,
      roleName: '担当者',
      recipientId: '2',
      routingOrder: '2',
      tabs: {
        signerAttachmentTabs: [{
          anchorString: '/tt/',
          documentId: '1',
          pageNumber: '1',
          tabLabel: '担当者',
        }],
      },
    });
  }


  /* 共通 */

  /* 店長 */
  signers.push({
    email: isProd ? storeMngrEmail : testTenchoEmail,
    name: storeMngrName,
    roleName: '店長',
    recipientId: '3',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/tc/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: '店長',
      }],
    },
  });

  /* 経理 */
  signers.push({
    email: isProd ? accountingEmail : testKeiriEmail,
    name: accountingName,
    roleName: '経理',
    recipientId: '33',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/ke/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: '経理',
      }],
    },
  });


  const env: EnvelopeDefinition = {
    emailSubject: `【${projName}】`,
    documents: [
      {
        documentBase64: documentBase64,
        name: '請負契約書',
        fileExtension: 'pdf',
        documentId: '1',

      },
    ],
    recipients: {
      signers: signers,
    },
    status: status,
  };

  return env;
};
