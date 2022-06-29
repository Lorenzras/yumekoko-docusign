import {templateIds} from './../config/envelopeTemplates';
import {
  createEnvelopeFromTemplate,
} from './../lib/esignature/createEnvelopeFromTemplate';

import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {getAccountId} from '../lib/authentication/fetchUserInfo';

const route = router();
route.use(bodyParser.urlencoded({extended: true}));

route.get('/', async (req, res)=>{
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
  res.status(200).json(result);
});


export default route;
