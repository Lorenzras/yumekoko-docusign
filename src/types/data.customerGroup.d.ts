declare namespace CustomerGroupTypes {
  interface Data {
    projectCount: kintone.fieldTypes.Number;
    storeId: kintone.fieldTypes.Number;
    custNames: kintone.fieldTypes.SingleLineText;
    cocoAGNames: kintone.fieldTypes.SingleLineText;
    isDeleted: kintone.fieldTypes.Number;
    yumeAGNames: kintone.fieldTypes.SingleLineText;
    custType: kintone.fieldTypes.RadioButton;
    storeName: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;
    projects: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          projId: kintone.fieldTypes.Number;
          projName: kintone.fieldTypes.SingleLineText;
          cancelStatus: kintone.fieldTypes.SingleLineText;
          kariAddress: kintone.fieldTypes.SingleLineText;
          cocoConst2Name: kintone.fieldTypes.SingleLineText;
          projectAddress1: kintone.fieldTypes.SingleLineText;
          envStatus: kintone.fieldTypes.SingleLineText;
          projectAddress2: kintone.fieldTypes.SingleLineText;
          cocoConst2: kintone.fieldTypes.Number;
          cocoConst1: kintone.fieldTypes.Number;
          projectPostal: kintone.fieldTypes.SingleLineText;
          cocoConst1Name: kintone.fieldTypes.SingleLineText;
          status: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    agents: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          employeeName: kintone.fieldTypes.SingleLineText;
          agentType: kintone.fieldTypes.SingleLineText;
          employeeId: kintone.fieldTypes.Number;
          email: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
    members: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          address2: kintone.fieldTypes.SingleLineText;
          address1: kintone.fieldTypes.SingleLineText;
          customerId: kintone.fieldTypes.Number;
          postal: kintone.fieldTypes.SingleLineText;
          dump: kintone.fieldTypes.SingleLineText;
          customerName: kintone.fieldTypes.SingleLineText;
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
