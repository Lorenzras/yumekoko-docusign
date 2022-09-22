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

type TReqDownloadParams = {
  fileType: string
  userCode: string,
  projEstimateId: string,
}

type TReqSendContract = TReqDownloadParams

