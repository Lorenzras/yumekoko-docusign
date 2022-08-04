import {syncProjects} from './syncProjects';

describe('syncProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await syncProjects();

    expect(result).toMatchSnapshot();
  }, 8000);
});
