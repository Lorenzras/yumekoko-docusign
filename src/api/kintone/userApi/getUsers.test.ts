import {getUsers} from './getUsers';

describe('getUsers', () => {
  it('should get users', async () => {
    const result = await getUsers({
      codes: 'RPA03',
    });

    expect(result).toMatchSnapshot();
  });
});
