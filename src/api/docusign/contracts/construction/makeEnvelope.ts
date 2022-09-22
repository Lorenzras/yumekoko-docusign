import {EnvelopeDefinition, Signer} from 'docusign-esign';
import {getContractData} from '../../../kintone/getContractData';
import {generateContractPdf} from './generateContractPdf';

export const makeEnvelope = async (
  data: Awaited<ReturnType<typeof getContractData>>,
  status: 'created' | 'sent' = 'sent') => {
  const {
    custEmail,
    custName,
    officerEmail,
    officerName,

    projName,
  } = data;

  const documentBase64 = await generateContractPdf(data, 'base64') as string;

  /* 顧客署名 */
  const customerSigner: Signer = {
    email: custEmail,
    name: custName,
    recipientId: '1',
    routingOrder: '2',
    tabs: {
      signHereTabs: [{
        anchorString: '/sH/',
        documentId: '1',
        recipientId: '1',
        pageNumber: '1',
        tabLabel: 'sH',
      }],
    },
  };

  /* 担当者 */
  const officerSinger: Signer = {
    email: officerEmail,
    name: officerName,
    recipientId: '2',
    routingOrder: '1',
    tabs: {
      signHereTabs: [{
        anchorString: '/sC/',
        documentId: '1',
        recipientId: '2',
        pageNumber: '1',
        tabLabel: 'sC',
      }],
    },
  };

  const env: EnvelopeDefinition = {
    emailSubject: `【${projName}】サインをお願いします。`,
    documents: [
      {
        documentBase64: documentBase64,
        name: '請負契約書',
        fileExtension: 'xls',
        documentId: '1',

      },
    ],
    recipients: {
      signers: [customerSigner, officerSinger],
    },
    status: status,
  };

  return env;
};
