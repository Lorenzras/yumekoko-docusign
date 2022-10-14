import {getContractData} from '../../../kintone/getContractData';
import {makeEnvelope} from './makeEnvelope';

/* TODO: Unit test, this test routine is not done */
it('should make envelop', async () => {
  const data = await getContractData({
    projEstimateId: '74',
    userCode: 'RPA03',
  });
  const result = await makeEnvelope(data, 'created');

  expect(result).toMatchSnapshot();
}, 30000);
