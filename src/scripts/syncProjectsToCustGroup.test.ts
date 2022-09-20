import {syncProjectsToCustGroup} from './syncProjectsToCustGroup';

describe('syncProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await syncProjectsToCustGroup();

    expect(result).toMatchSnapshot();
  }, 8000);
});
