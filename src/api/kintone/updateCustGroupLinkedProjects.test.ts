import {updateCustGroupLinkedProjects} from './updateCustGroupLinkedProjects';

describe('update linked', ()=>{
  it('should update linked projects', async ()=>{
    const result = await updateCustGroupLinkedProjects('178');
    expect(result).toMatchSnapshot();
  }, 3000);
});
