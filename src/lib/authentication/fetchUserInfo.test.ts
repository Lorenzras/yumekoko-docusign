import {fetchUserInfo} from './fetchUserInfo';

describe('Base URI', ()=>{
  it('should get base uri', async ()=>{
    const response = await fetchUserInfo();
    console.log('base uri', response?.accounts[0].baseUri);
    expect(response).toMatchSnapshot();
  });
});
