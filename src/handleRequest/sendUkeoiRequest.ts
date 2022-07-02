import {RequestHandler} from 'express';
import {sendUkeoi} from '../lib/contracts/sendUkeoi';

type TProjId = {
  projId?: string
}

export const sendUkeoiRequest: RequestHandler = async (req, res) => {
  const body: TProjId = req.body;
  console.log('Received', body);
  const projId = body.projId;

  try {
    if (projId && typeof projId === 'string') {
      const result = await sendUkeoi(projId);
      res.status(200).json(result);
    } else {
      res.status(400).send('<h1> 400 Bad Request</h1>');
    }
  } catch (error: any) {
    res.status(400).send(`Request failed. ${error.message}`);
  }
};
