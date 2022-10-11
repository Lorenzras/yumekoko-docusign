/**
 * Recipient status
 * https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/recipients/
 *
 *
 *
 */


type TEnvelopeStatus =
| 'sent'
| 'created'
| 'completed'
| 'delivered'
| 'voided'
| '' ;

type TEnvelope = {
  signerEmail : string,
  signerName: string,
  ccEmail: string,
  ccName: string,
  status: 'sent',
  doc2File: string,
  doc3File: string,
};

interface IRequestJWTUserTokenResponse {
  body: {
    access_token: string,
    expires_in: string
  }
}

interface IDSAccount {
  accountId: string,
  accountName : string,
  baseUri: string,
  isDefault: string,
  organization: {
    links:{
      href: string, // 'https://account-d.docusign.com/organizations/020a334d-4...79-9e8af32ce1bb',
      rel: string, // self
    }[],
    organization_id: string, // '020a334d....8af32ce1bb',
  },
}

interface IGetUserInfoResponse {
  accounts: Array<IDSAccount>
}

const events = [
  'envelope-sent',
  'envelope-resent',
  'envelope-delivered',
  'envelope-completed',
  'envelope-declined',
  'envelope-voided',
  'recipient-authenticationfailed',
  'recipient-autoresponded',
  'recipient-declined',
  'recipient-delivered',
  'recipient-completed',
  'recipient-sent',
  'recipient-resent',
  'template-created',
  'template-modified',
  'template-deleted',
  'envelope-corrected',
  'envelope-purge',
  'envelope-deleted',
  'envelope-discard',
  'recipient-reassign',
  'recipient-delegate',
  'recipient-finish-later',
  'click-agreed',
  'click-declined',
  'sms-opt-in',
  'sms-opt-out',
] as const;

type TConnectEventType = typeof events[number];

interface IRecipient {
  creationReason: string,
  isBulkRecipient: string,
  requireUploadSignature: string,
  name: string,
  firstName: string,
  lastName: string,
  email: string,
  recipientId: string,
  recipientIdGuid: string,
  requireIdLookup: string,
  userId: string,
  routingOrder: string,
  note: string,
  roleName: string,
  status: string,
  completedCount: string,
  deliveryMethod: string,
  recipientType: string
}

/**
 * Webhook event
 */
interface IConnectEvent {
  event: TConnectEventType,
  uri: string,
  retryCount: string,
  configurationId: string,
  apiVersion: string,
  generatedDateTime: string,
  data: {
    accountId: string,
    recipientId: string,
    envelopeId: string,
    envelopeSummary: {
      status: string,
      emailSubject: string,
      emailBlurb: string,
      signingLocation: string,
      enableWetSign: string,
      allowMarkup: string,
      allowReassign: string,
      createdDateTime: string,
      lastModifiedDateTime: string,
      statusChangedDateTime: string,
      useDisclosure: string,
      sender: {
        userName: string,
        userId: string,
        accountId: string,
        email: string
      },
      recipients: IRecipient[],
      envelopeDocuments: [
        {
          documentId: string,
          documentIdGuid: string,
          name: string,
          type: string,
          order: string,
          display: string,
          includeInDownload: string,
          signerMustAcknowledge: string,
          templateRequired: string,
          authoritative: string,
          PDFBytes: string
        }
      ]
    }
  }
}

type IConnectRecipients = IConnectEvent['data']['envelopeSummary']['recipients']

interface ISendEnvelopeResponse {
  /** base64 files */
  documents: string[],
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
}


interface IVoidReq {
  envelopeId: string,
  voidedReason: string
}

interface IVoidRes
{
  voidSuccess: boolean,
  envelopeStatus: TEnvelopeStatus,
  envelopSummary: EnvelopeUpdateSummary,
  documents?: string[],
  error?: string,
}


type TSignMethod = 'electronic' | 'wetInk'


/* Utilities, this needs to be on a separate file. */
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

