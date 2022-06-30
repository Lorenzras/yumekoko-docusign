import {getCustomerGroup} from './getCustomerGroup';

describe('getCustomerGroup', ()=>{
  it('should get customer group record', async ()=>{
    const result = await getCustomerGroup('176');
    expect(result).toMatchSnapshot();
  }, 30000);
});
