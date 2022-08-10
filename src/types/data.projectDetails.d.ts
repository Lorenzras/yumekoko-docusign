declare namespace ProjectDetails {
  interface Data {
    schedContractDate: kintone.fieldTypes.Date;
    constructionTypeId: kintone.fieldTypes.Number;
    constructionType: kintone.fieldTypes.SingleLineText;
    addressKari: kintone.fieldTypes.SingleLineText;
    cancelStatus: kintone.fieldTypes.SingleLineText;
    memo: kintone.fieldTypes.SingleLineText;
    schedContractPrice: kintone.fieldTypes.Number;
    envelopeId: kintone.fieldTypes.SingleLineText;
    rank: kintone.fieldTypes.SingleLineText;
    constructionName: kintone.fieldTypes.SingleLineText;
    custGroupId: kintone.fieldTypes.Number;
    estatePurchaseDate: kintone.fieldTypes.Date;
    dsEnvIdUkeoi: kintone.fieldTypes.SingleLineText;
    voidedEnvelopes: kintone.fieldTypes.SingleLineText;
    isChkAddressKari: kintone.fieldTypes.Number;
    planApplicationDate: kintone.fieldTypes.Date;
    envelopeRecipients: kintone.fieldTypes.SingleLineText;
    isDoneInputContract: kintone.fieldTypes.SingleLineText;
    address2: kintone.fieldTypes.SingleLineText;
    address1: kintone.fieldTypes.SingleLineText;
    store: kintone.fieldTypes.SingleLineText;
    contractPrice: kintone.fieldTypes.Number;
    isAgentConfirmed: kintone.fieldTypes.SingleLineText;
    postal: kintone.fieldTypes.SingleLineText;
    signMethod: kintone.fieldTypes.SingleLineText;
    buildingType: kintone.fieldTypes.SingleLineText;
    status: kintone.fieldTypes.SingleLineText;
    envelopeStatus: kintone.fieldTypes.SingleLineText;

    envDocFileKeys: kintone.fieldTypes.File;
    custGroupAgents: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          custAgentType: kintone.fieldTypes.SingleLineText;
          custAgentName: kintone.fieldTypes.SingleLineText;
          custAgentId: kintone.fieldTypes.Number;
        };
      }>;
    };
    agents: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          agentId: kintone.fieldTypes.Number;
          agentType: kintone.fieldTypes.SingleLineText;
          agentName: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    custGroup: {
      type: 'SUBTABLE';
      value: Array<{
        id: string;
        value: {
          custNameReading: kintone.fieldTypes.SingleLineText;
          custId: kintone.fieldTypes.Number;
          custName: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
