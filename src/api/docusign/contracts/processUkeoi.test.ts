import {processUkeoi} from './processUkeoi';

describe('sendUkeoi', ()=>{
  it('should send ukeoi', async ()=>{
    const result = await processUkeoi('111');
    expect(result).toMatchSnapshot();
  }, 30000);
});
