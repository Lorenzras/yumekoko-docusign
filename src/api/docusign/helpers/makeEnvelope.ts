import {
  CarbonCopy,
  Document,
  EnvelopeDefinition,
  Recipients, Signer,
  SignHere,
  Tabs,
} from 'docusign-esign';
import fs from 'fs/promises';

/* For reference purposes only. Ignore */
export const makeEnvelope = async (args: {
  signerEmail: string,
  signerName: string,
  ccEmail: string,
  ccName: string,
  status: 'sent' | 'created',
  filePath: string
}) =>{
  console.log(args);
  const fileByte = await fs.readFile(args.filePath);
  const docB64 = Buffer.from(fileByte).toString('base64');

  const doc: Document = {
    documentBase64: docB64,
    name: 'テスト',
    fileExtension: 'pdf',
    documentId: '1',
  };


  const signHere: SignHere = {
    anchorString: 'sign',
    documentId: '1',
    recipientId: '1',
    pageNumber: '1',
    tabLabel: 'Sig1',
  };

  const signerTabs: Tabs = {

    signHereTabs: [signHere],
  };

  const signer: Signer = {
    email: args.signerEmail,
    name: args.signerName,
    recipientId: '1',
    routingOrder: '1',
    tabs: signerTabs,
  };

  const cc: CarbonCopy = {
    email: args.ccEmail,
    name: args.ccName,
    routingOrder: '2',
    recipientId: '2',
  };

  const recipients: Recipients = {
    signers: [signer],
    carbonCopies: [cc],
  };

  const env: EnvelopeDefinition = {
    emailSubject: 'Please sign this document set',
    documents: [doc],
    recipients: recipients,
    status: args.status,
  };


  return env;
};
