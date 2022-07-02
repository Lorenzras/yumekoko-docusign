import {previewUkeoiReq} from './../handleRequest/previewUkeoiReq';


import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {sendUkeoiReq} from '../handleRequest/sendUkeoiReq';

const route = router();
route.use(bodyParser.json());

route.get('/ukeoi/preview', previewUkeoiReq);
route.post('/ukeoi', sendUkeoiReq);


route.get('/test', (req, res)=>{
  console.log('Connection test is succes');
  res.status(200).send('SUCCESS');
});


export default route;
