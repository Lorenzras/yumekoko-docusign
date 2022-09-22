type TProjReq = {
  projId?: string,
  custGroupId?:string,
  envelopeId?: string,
  origin?: string
}

type KeyOfProjDetails = keyof ProjectDetails.SavedData;
type KeyOfProjEstimates = keyof ProjectEstimates.SavedData;


type TReqPreviewParams = {
  projId: string,
  projEstimateId: string
  userCode: string,
}

interface ReqSendContract {
  [k: string]: string,
  userCode: string,
  projEstimateId: string,
}
interface ReqDownloadParams extends ReqSendContract {
  fileType: string,
}


