
import {basePath} from '../../config';
import {getJwtGrantToken} from '../authentication/fetchAccessToken';
import {getAccountId} from '../authentication/fetchUserInfo';
import {createEnvelopeFromFile} from './createEnvelopeFromFile';
import path from 'path';

describe('Create Envelope', ()=>{
  it('should create envelope then send', async ()=>{
    const token = await getJwtGrantToken();
    const accountId = await getAccountId();
    const result = await createEnvelopeFromFile({
      accessToken: token.accessToken,
      accountId,
      basePath: basePath,
      filePath: path.resolve(__dirname, '__TEST__', 'test.en.pdf'),
    });
    expect(result).toMatchSnapshot();
  }, 30000);
});
