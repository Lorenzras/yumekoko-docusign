import {getUserInfo} from './getUserInfo';

describe('Base URI', ()=>{
  it('should get base uri', async ()=>{
    const response = await getUserInfo();
    console.log('base uri', response.accounts[0].baseUri);
    expect(response).toMatchSnapshot();
  });
});
