
import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {sendUkeoiReq} from '../handleRequest/sendUkeoiReq';
import {downloadUkeoiReq} from '../handleRequest/downloadUkeoiReq';
import {previewUkeoiReq} from './../handleRequest/previewUkeoiReq';


const route = router();
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

route.post('/ukeoi/preview', previewUkeoiReq);
route.get('/ukeoi/download', downloadUkeoiReq);

route.post('/ukeoi', sendUkeoiReq);


route.get('/test', (req, res)=>{
  console.log('Connection test is succes');
  res.status(200).send('SUCCESS');
});


export default route;
