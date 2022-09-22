declare namespace Employees {
  interface Data {
    文字列＿氏名: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    mainStore: kintone.fieldTypes.SingleLineText;
    日付＿誕生日: kintone.fieldTypes.Date;
    入社日: kintone.fieldTypes.Date;
    mainStoreId: kintone.fieldTypes.Number;
    役職: kintone.fieldTypes.DropDown;
    affiliation: kintone.fieldTypes.DropDown;
    誕生日＿月日: kintone.fieldTypes.SingleLineText;
    contact: kintone.fieldTypes.SingleLineText;
    状態: kintone.fieldTypes.DropDown;
    氏名ふりがな: kintone.fieldTypes.SingleLineText;
    email: kintone.fieldTypes.SingleLineText;
    所属チーム: kintone.fieldTypes.SingleLineText;
    territory: kintone.fieldTypes.SingleLineText;

    account: kintone.fieldTypes.UserSelect;
    テーブル: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          文字列__1行__4: kintone.fieldTypes.SingleLineText;
          日付: kintone.fieldTypes.Date;
        };
      }>;
    };
    affiliateStores: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          storeName: kintone.fieldTypes.SingleLineText;
          storeId: kintone.fieldTypes.Number;
          affiliationState: kintone.fieldTypes.RadioButton;
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
