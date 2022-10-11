import {getContractData} from './getContractData';

describe('Contract', () => {
  it('should be able to get contract data', async () => {
    const result = await getContractData({
      projEstimateId: '74',
      userCode: 'RPA03',
    });

    expect(result).toMatchSnapshot();
  });
});
