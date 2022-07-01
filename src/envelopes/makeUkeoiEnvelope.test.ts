import {makeUkeoiEnvelope} from './makeUkeoiEnvelope';

describe('makeUkeoiEnvelope', () => {
  it('should be able to make envelope from file', async ()=>{
    const result = await makeUkeoiEnvelope({
      custEmail: 'lenzras@gmail.com',
      custName: 'Lorenz Ras',
      projId: '',
      projName: '',
    });

    expect(result).toMatchSnapshot();
  });
});
