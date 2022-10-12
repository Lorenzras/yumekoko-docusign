
import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {
  reqSendContractDirect} from '../handleRequest/reqSendContractDirect';
import {reqDownloadContract} from '../handleRequest/reqDownloadContract';
import {previewUkeoiEnvelope} from '../handleRequest/previewUkeoiEnvelope';
import {handleTriggers} from '../handleRequest/webhookDocusign/handleTriggers';
import {reqVoidEnvelope} from '../handleRequest/reqVoidEnvelope';
import {reqGetSenderView} from '../handleRequest/reqGetSenderView';
import {reqResendContract} from '../handleRequest/reqResendContract';
import bodyParserErrorHandler from 'express-body-parser-error-handler';


const route = router();
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

route.use(bodyParserErrorHandler({
  onError: (err: unknown) => {
    console.log(err);
  },
}));


route.post('/webhook', handleTriggers );

route.post('/contract/preview', previewUkeoiEnvelope);

route.post('/contract/void', reqVoidEnvelope);

route.post('/contract/send/direct', reqSendContractDirect);

route.post('/contract/resend', reqResendContract);

route.post('/contract/senderViewUrl', reqGetSenderView);

route.get('/contract/download', reqDownloadContract);

route.get('/test', (req, res)=>{
  console.log('Connection test is success');
  res.status(200).send('SUCCESS');
});


export default route;
