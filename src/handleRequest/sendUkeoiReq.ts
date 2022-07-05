import {RequestHandler} from 'express';
import {processUkeoi} from '../lib/contracts/processUkeoi';


export const sendUkeoiReq: RequestHandler = async (req, res) => {
  const body: TProjIdReq = req.body;
  console.log('Received', body);
  const projId = body.projId;

  try {
    if (projId && typeof projId === 'string') {
      const result = await processUkeoi(projId);
      console.log('Success');
      res.status(200).json(result);
    } else {
      res.status(401).send('<h1> 400 Bad Request</h1>');
    }
  } catch (error: any) {
    res.status(400).send(`Request failed. ${error.message}`);
  }
};