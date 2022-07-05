import {createSenderView} from './createSenderView';


describe('createSenderView', () => {
  it('should give url for the sender', async () => {
    const r = await createSenderView('881f9f2f-c540-4bc9-8e30-24a53dc6b6fa');
    console.log(r?.url);
    expect(r).toMatchSnapshot();
  }, 30000);
});
