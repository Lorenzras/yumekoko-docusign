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
      rel: string, // "self"
    }[],
    organization_id: string, // '020a334d....8af32ce1bb',
  },
}

interface IGetUserInfoResponse {
  accounts: Array<IDSAccount>
}
