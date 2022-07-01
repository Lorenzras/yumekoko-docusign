
import {
  Document, EnvelopeDefinition,
  Recipients, Signer, SignHere, Tabs} from 'docusign-esign';
import fs from 'fs/promises';
import path from 'path';

import excel from 'exceljs';


export const makeUkeoiEnvelope = async ({
  custEmail, custName,
  projId, projName,
}
:{
  custEmail: string,
  custName: string,
  projId: string,
  projName: string,
}) => {
  console.log(projName);
  const ukeoiFile = path.join(__dirname, 'assets', '請負契約書.xlsx' );

  // Edit excel file.
  let workbook = new excel.Workbook();
  workbook = await workbook.xlsx.readFile(ukeoiFile);
  const ws = workbook.getWorksheet('契約書');

  // 工事番号
  ws.getCell('H2').value = projId;
  // 工事名
  ws.getCell('M2').value = projName;


  const docB64 = Buffer.from(await workbook.xlsx.writeBuffer())
    .toString('base64');
  /*   const fileByte = await fs.readFile(ukeoiFile);
  const docB64 = Buffer.from(fileByte).toString('base64'); */

  const doc: Document = {
    documentBase64: docB64,
    name: 'テスト',
    fileExtension: 'xls',
    documentId: '1',
  };

  console.log(custEmail);
  const signHere: SignHere = {
    anchorString: '/sH/',
    documentId: '1',
    recipientId: '1',
    pageNumber: '1',
    tabLabel: 'sH',
  };

  const signerTabs: Tabs = {
    signHereTabs: [signHere],
  };

  const signer: Signer = {
    email: custEmail,
    name: custName,
    recipientId: '1',
    routingOrder: '1',
    tabs: signerTabs,
  };

  const recipients: Recipients = {
    signers: [signer],
  };

  const env: EnvelopeDefinition = {
    emailSubject: 'Please sign this document set',
    documents: [doc],
    recipients: recipients,
    status: 'sent',
  };

  return env;
};
