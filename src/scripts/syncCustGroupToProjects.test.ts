import {syncCustGroupToProjects} from './syncCustGroupToProjects';

describe('syncCustGroupToProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await syncCustGroupToProjects();

    expect(result).toMatchSnapshot();
  }, 8000);
});
