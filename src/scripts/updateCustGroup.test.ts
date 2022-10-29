import {updateCustGroup} from './updateCustGroup';

describe('updateCustGroup', ()=>{
  it('should update custGroup', async ()=>{
    const result = await updateCustGroup();

    expect(result).toMatchSnapshot();
  }, 8000);
});
