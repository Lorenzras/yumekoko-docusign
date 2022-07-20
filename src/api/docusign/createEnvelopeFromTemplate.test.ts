import {templateIds} from './../../config/envelopeTemplates';

import {basePath} from '../../config';
import {getJwtGrantToken} from '../authentication/fetchAccessToken';
import {getAccountId} from '../authentication/fetchUserInfo';
import {createEnvelopeFromFile} from './createEnvelopeFromFile';
import path from 'path';
import {createEnvelopeFromTemplate} from './createEnvelopeFromTemplate';

describe('Create Envelope', ()=>{
  it('should create envelope then send', async ()=>{
    const accountId = await getAccountId();
    const result = await createEnvelopeFromTemplate({
      accountId,
      envelope: {
        emailSubject: 'テンプレートから送信しました',
        templateId: templateIds.test,
        status: 'sent',
        templateRoles: [
          {
            'roleName': 'Signer1',
            'name': 's1',
            'email': 'lenzras@gmail.com'},
          {
            'roleName': 'CC1',
            'name': 'cc1',
            'email': 'cocosumo.rpa03@gmail.com',
          },
        ],
      },
    });
    expect(result).toMatchSnapshot();
  }, 30000);
});
