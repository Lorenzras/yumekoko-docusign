import {updateEstimates} from './updateEstimates';

describe('updateEstimates', ()=>{
  it('should update projEstimates', async ()=>{
    const result = await updateEstimates();

    expect(result).toBeDefined();
  }, 8000);
});
