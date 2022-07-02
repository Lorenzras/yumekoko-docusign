import {sendUkeoi} from './sendUkeoi';

describe('sendUkeoi', ()=>{
  it('should send ukeoi', async ()=>{
    const result = await sendUkeoi('111');
    expect(result).toMatchSnapshot();
  }, 30000);
});
