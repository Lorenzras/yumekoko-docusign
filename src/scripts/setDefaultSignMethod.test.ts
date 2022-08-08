import {setDefaultSignMethod} from './setDefaultSignMethod';

describe('setDefaultSignMethod', ()=>{
  it('should update projects', async ()=>{
    const result = await setDefaultSignMethod();

    expect(result).toMatchSnapshot();
  }, 8000);
});
