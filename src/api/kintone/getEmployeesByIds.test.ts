import {getEmployeesByIds} from './getEmployeesByIds';

describe('Employees', () => {
  it('should get all employees by ids', async () => {
    const result = await getEmployeesByIds(['69', '68', '70']);

    expect(result).toMatchSnapshot();
  });
});
