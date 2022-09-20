import {getCustomerById} from './getCustomerById';

describe('Customer', ()=>{
  it('should get customer record', async ()=>{
    const result = await getCustomerById('435');
    expect(result).toMatchSnapshot();
  }, 30000);
});
