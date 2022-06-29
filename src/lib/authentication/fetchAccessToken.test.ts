import {fetchAccessToken} from './fetchAccessToken';

describe('Authentication', () => {
  it('should give token', async () => {
    const token = await fetchAccessToken();

    expect(token).toMatchSnapshot();
  });
});
