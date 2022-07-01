import {RequestHandler} from 'express';
import {getEnvelopDefinition} from '../api/others/getEnvelopDefinition';
import {getAccountId} from '../lib/authentication/fetchUserInfo';
import {
  createEnvelopeFromTemplate,
} from '../lib/esignature/createEnvelopeFromTemplate';

type TProjId = {
  projId?: string
}

export const sendContract: RequestHandler = async (req, res) => {
  const body: TProjId = req.body;
  console.log('Received', body);
  const projId = body.projId;

  try {
    if (projId && typeof projId === 'string') {
      const accountId = await getAccountId();
      const envelope = await getEnvelopDefinition(projId);
      const result = await createEnvelopeFromTemplate({
        accountId, envelope,
      });

      res.status(200).json(result);
    } else {
      res.status(400).send('<h1> 400 Bad Request</h1>');
    }
  } catch (error: any) {
    res.status(400).send(`Request failed. ${error.message}`);
  }
};
