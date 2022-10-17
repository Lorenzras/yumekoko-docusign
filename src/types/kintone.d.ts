type TProjReq = {
  projId?: string,
  custGroupId?:string,
  envelopeId?: string,
  origin?: string
}

type KeyOfProjDetails = keyof ProjectDetails.SavedData;
type KeyOfProjEstimates = keyof ProjectEstimates.SavedData;
type KeyOfEmployees = keyof Employees.SavedData;
type KeyOfEmployeesStores = keyof Employees
  .SavedData['affiliateStores']['value'][number]['value'];

type TReqPreviewParams = {
  projId: string,
  projEstimateId: string
  userCode: string,
}

interface ReqSendContract {
  userCode: string,
  projEstimateId: string,
  signMethod: 'electronic' | 'wetInk',
}
interface ReqDownloadParams {
  userCode: string,
  projEstimateId: string,
  fileType: 'pdf' | 'xlsx',
}

// This also exist at the frontend.
type AgentType = 'cocoAG' | 'yumeAG' | 'cocoConst';
type Company = 'すてくら' | 'ここすも' | 'ゆめてつ'


