type TProjReq = {
  projId?: string,
  custGroupId?:string,
  envelopeId?: string,
  origin?: string
}

type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
