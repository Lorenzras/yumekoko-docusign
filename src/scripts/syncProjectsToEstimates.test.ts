import {syncProjectsToEstimates} from './syncProjectsToEstimates';

describe('syncProjectsToEstimates', ()=>{
  it('should update estimates', async ()=>{
    const result = await syncProjectsToEstimates();

    expect(result).toMatchSnapshot();
  }, 8000);
});
