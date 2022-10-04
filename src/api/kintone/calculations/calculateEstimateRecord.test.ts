import {getEstimateById} from '../getEstimateById';
import {calculateEstimateRecord} from './calculateEstimateRecord';

describe('Calculate estimate', () => {
  it('should calculate estimate', async () => {
    const record = await getEstimateById('39');
    const result = await calculateEstimateRecord(record);

    console.log(result);
    expect(result).toHaveProperty('totalCostPrice');
  }, 10000 );
});
