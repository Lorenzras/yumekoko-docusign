/* eslint-disable max-len */
import axios from 'axios';
import {RequestHandler} from 'express';
import {createSenderView} from '../api/docusign/createSenderView';

// Will return URL.
export const reqGetSenderView: RequestHandler = async (req, res) => {
  const body: TProjReq = req.body;

  const {
    envelopeId = '',
    returnUrl = '',
  } = body as {
    envelopeId: string,
    returnUrl: string,
  };

  console.log('Received', envelopeId);
  console.log('Return url', returnUrl);
  try {
    if (envelopeId && typeof envelopeId === 'string') {
      const result = await createSenderView(envelopeId, returnUrl);
      if (result && result.url) {
        // The returned URL can only be redirected to immediately after it is generated.
        // It can only be used once.
        // Therefore, request the URL immediately before you redirect your user to it.
        // await axios.get(result.url);
        console.log(result.url.replace('send=1', 'send=0'));
      }


      console.log('Send sender view');
      res.status(200).json(result);
    } else {
      res.status(401).send('<h1> 400 Bad Request</h1>');
    }
  } catch (error: any) {
    res.status(200).send(`Request failed. ${error.message}`);
  }
};
