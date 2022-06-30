import {getProjectDetails} from './getProjectDetails';

describe('getProjectDetails', ()=>{
  it('should get project details', async ()=>{
    const result = await getProjectDetails('115');
    expect(result).toMatchSnapshot();
  }, 30000);
});
