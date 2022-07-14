
import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {sendUkeoiReq, sendUkeoiReqDirect} from '../handleRequest/sendUkeoiReq';
import {downloadUkeoi} from '../handleRequest/downloadUkeoi';
import {previewUkeoiEnvelope} from '../handleRequest/previewUkeoiEnvelope';
import {handleTriggers} from '../handleRequest/webhookDocusign/handleTriggers';


const route = router();
route.use(bodyParser.json({limit: '50mb'}));
route.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));


route.post('/webhook', handleTriggers );
route.post('/ukeoi/preview', previewUkeoiEnvelope);
route.get('/ukeoi/download', downloadUkeoi);

route.post('/ukeoi/send/direct', sendUkeoiReqDirect);
route.post('/ukeoi/send', sendUkeoiReq);


route.get('/test', (req, res)=>{
  console.log('Connection test is succes');
  res.status(200).send('SUCCESS');
});


export default route;
