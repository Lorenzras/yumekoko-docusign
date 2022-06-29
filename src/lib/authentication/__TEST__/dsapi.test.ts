import {apiClient, ds, integratorKey, userId} from '../../../config';
import {fetchAccessToken} from '../fetchAccessToken';
import {getUserInfo} from '../fetchUserInfo';
describe('DS API', ()=>{
  it('should list folders', async () => {
    const {accounts} = await getUserInfo() || {};
    const {accountId} = accounts?.[0] || {};


    const api = new ds.FoldersApi(apiClient);


    const res = await api.list(accountId);

    expect(res).toMatchSnapshot();
  }, 1000*60);
});
