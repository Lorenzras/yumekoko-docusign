
import {
  EnvelopeDefinition,
  Signer,
} from 'docusign-esign';
import path from 'path';

import excel from 'exceljs';
import {generatePdfUkeoi} from './generatePdfUkeoi';


/**
 * Populate 請負契約書 details
 *
 *
 * @param param0
 * @param outputType the type to return
 * @returns {Object} returns Xlsx by default
 */
export const generateUkeoiExcel = async (
  {
    custName, custAddress,
    projId, projName,
    projLocation,
    repName,
  }: TUkeoiFields,
  outputType: 'buffer' | 'b64' | 'xlsx' | 'binary' = 'xlsx',
) => {
  const ukeoiFile = path.join(__dirname, 'assets', '請負契約書.xlsx' );

  // Read excel file.
  let workbook = new excel.Workbook();
  workbook = await workbook.xlsx.readFile(ukeoiFile);
  const ws = workbook.getWorksheet('契約書');

  // 工事番号
  ws.getCell('H2').value = projId;

  // 工事番号
  ws.getCell('K16').value = projLocation;

  // 工事名
  ['M2', 'G14']
    .forEach((c) => ws.getCell(c).value = projName);

  // 発注者
  ['G9', 'K41']
    .forEach((c) => ws.getCell(c).value = `${custName} 様`);

  // 発注者の住所
  ws.getCell('K40').value = custAddress;

  // 担当者名
  ws.getCell('K46').value = repName;


  switch (outputType) {
    case 'b64':
      return Buffer.from(await workbook.xlsx.writeBuffer())
        .toString('base64');
    case 'buffer':
      return await workbook.xlsx.writeBuffer();
    case 'xlsx':
      return workbook.xlsx;
    case 'binary':
      return Buffer.from(await workbook.xlsx.writeBuffer())
        .toString('binary');
  }
};


/**
 * Creates envelope from file
 *
 * @param data
 * @param status Status of created envelope
 * @returns {EnvelopeDefinition} the envelope object
 */
export const makeUkeoiEnvelope = async (
  data :TUkeoiFields,
  status: 'created' | 'sent' = 'sent') => {
  const {
    custEmail, custName,
    repName, repEmail,
    projName,
  } = data;

  const documentBase64 = await generatePdfUkeoi(data, 'base64') as string;

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

  const companySigner: Signer = {
    email: repEmail,
    name: repName,
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
      signers: [customerSigner, companySigner],
    },
    status: status,
  };

  return env;
};
