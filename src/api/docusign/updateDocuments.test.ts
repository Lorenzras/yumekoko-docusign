import {getAccountId} from '../../lib/authentication/fetchUserInfo';
import {getUkeoiData} from '../../lib/contracts/getUkeoiData';
import {
  makeUkeoiEnvelope} from '../../lib/contracts/makeUkeoiEnvelope';
import {updateDocuments} from './updateDocuments';

describe('updateDocument', ()=>{
  it('should update document', async ()=>{
    const data = await getUkeoiData('109');
    const env = await makeUkeoiEnvelope(data, 'created');
    const result = await updateDocuments(
      {
        envelopeId: 'a555c68a-b17d-48e5-ae15-e3a1996f0880',
        envelope: env,
      });

    expect(result).toMatchSnapshot();
  }, 30000);
});
