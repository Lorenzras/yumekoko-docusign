import {updateProjects} from './updateProjects';

describe('updateProjects', ()=>{
  it('should update projects', async ()=>{
    const result = await updateProjects();

    expect(result).toBeDefined();
  }, 8000);
});
