import {getAccessToken} from './getAccessToken';

describe('Authentication', () => {
  it('should give token', async () => {
    const token = await getAccessToken();

    expect(token).toMatchSnapshot();
  });
});
