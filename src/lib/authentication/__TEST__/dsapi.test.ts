import {apiClient, ds, integratorKey, userId} from '../../../config';
import {getAccessToken} from '../getAccessToken';
import {getUserInfo} from '../getUserInfo';
describe('DS API', ()=>{
  it('should list folders', async () => {
    const {accounts} = await getUserInfo();
    const {accountId} = accounts[0];


    const api = new ds.FoldersApi(apiClient);


    const res = await api.list(accountId);

    expect(res).toMatchSnapshot();
  }, 1000*60);
});
