import {fetchAccessToken, getJwtGrantToken} from './fetchAccessToken';

describe('Authentication', () => {
  it('should give token', async () => {
    const token = await fetchAccessToken();

    expect(token).toMatchSnapshot();
  });

  it('should get token if expired', async ()=>{
    const token = await getJwtGrantToken();

    expect(token).toMatchSnapshot();
  });
});
