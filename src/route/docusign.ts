
import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {
  reqSendContractDirect} from '../handleRequest/reqSendContractDirect';
import {reqDownloadContract} from '../handleRequest/reqDownloadContract';
import {previewUkeoiEnvelope} from '../handleRequest/previewUkeoiEnvelope';
import {handleTriggers} from '../handleRequest/webhookDocusign/handleTriggers';
import {voidEnvelopeReq} from '../handleRequest/voidEnvelopeReq';
import {reqGetSenderView} from '../handleRequest/reqGetSenderView';


const route = router();
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));


route.post('/webhook', handleTriggers );

route.post('/contract/preview', previewUkeoiEnvelope);

route.post('/contract/void', voidEnvelopeReq);

route.post('/contract/send/direct', reqSendContractDirect);

route.post('/contract/senderViewUrl', reqGetSenderView);

route.get('/contract/download', reqDownloadContract);

route.get('/test', (req, res)=>{
  console.log('Connection test is succes');
  res.status(200).send('SUCCESS');
});


export default route;
