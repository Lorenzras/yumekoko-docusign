import {voidEnvelope} from './voidEnvelope';

describe('Void', ()=>{
  it('should void envelope', async ()=>{
    const result = await voidEnvelope({
      envelopeId: 'aafe49c4-e63e-454f-a09e-df8b0e39e953',
      voidedReason: 'テストで無効化',
    });

    console.log(result.envelopeId);

    expect(result).toMatchSnapshot();
  }, 30000);
});
