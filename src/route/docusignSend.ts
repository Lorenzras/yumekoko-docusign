

import {Router as router} from 'express';
import bodyParser from 'body-parser';
import {sendUkeoiRequest} from '../handleRequest/sendUkeoiRequest';

const route = router();
route.use(bodyParser.json());

route.post('/ukeoi', sendUkeoiRequest);


export default route;
