type TUkeoiFields = {
  custEmail: string, // 発注者メール
  custName: string, // 発注者
  custAddress: string, // 発注者の住所
  projId: string, // 工事番号
  projName: string, // 工事名
  projLocation: string, // 工事場所

  repName: string, // 担当者名
  repEmail: string, // 担当者メール

  contractDate?: string // 契約日
  startDate?: string // 着手
  finishDate?: string // 完成
  transferDate?: string // 引っ越し時期
  paymentAmount?: string // 請負代金額
  pretaxFee?: string // うち工事価格
  taxFee?: string // 取引に係る消費税等額
  contractPayment?: string // 契約金
  startPayment?: string // 着手金
  midPayment?: string // 中間金
  finalPayment?: string // 最終金
  paymentMethod?: '持参' | '集金' | '振込' // 支払方法
}
