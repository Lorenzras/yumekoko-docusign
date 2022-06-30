import {templateIds} from './../config/envelopeTemplates';
import {
  createEnvelopeFromTemplate,
} from './../lib/esignature/createEnvelopeFromTemplate';

import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {getAccountId} from '../lib/authentication/fetchUserInfo';
import {sendContract} from '../requestHandlers/sendContract';

const route = router();
route.use(bodyParser.json());
route.post('/send', sendContract);


route.post('/sendTest', async (req, res)=>{
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
  res.status(201).json(result);
});


export default route;
