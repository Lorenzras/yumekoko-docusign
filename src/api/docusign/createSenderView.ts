import {EnvelopesApi, ReturnUrlRequest} from 'docusign-esign';
import {apiClient} from '../../config';
import {getAccountId} from '../../lib/authentication/fetchUserInfo';

export const createSenderView = async (
  envelopeId: string,
  returnUrl = 'https://www.google.com',
) => {
  const accountId = await getAccountId();
  console.log(accountId);
  const envApi = new EnvelopesApi(apiClient);

  const viewRequest: ReturnUrlRequest = {
    returnUrl: returnUrl,
  };


  console.log(accountId, envelopeId);

  return await envApi.createSenderView(
    accountId,
    envelopeId,
    {
      'returnUrlRequest': viewRequest,
      'showEditPages': 'false',
    },
  ).catch((err)=>{
    console.log(err.message);
  });
};
