import {processUkeoi} from '../../lib/contracts/processUkeoi';
import {createSenderView} from './createSenderView';


describe('createSenderView', () => {
  it('should give url for the sender', async () => {
    /*     const result = await processUkeoi('110', 'created');
    const {
      envelopeSummary = {},
    } = result;
    const {envelopeId} = envelopeSummary;

    console.log('EnvelopeId', envelopeId); */

    const r = await createSenderView('781cf273-e5a2-43b2-9d38-cd62ca89fd10');
    // console.log(r?.url?.replace('send=1', 'send=0'));
    expect(r).toMatchSnapshot();
  }, 30000);
});
