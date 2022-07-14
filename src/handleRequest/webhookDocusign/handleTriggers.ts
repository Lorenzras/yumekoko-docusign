/**
 * Docusignは長く存在していて、最新の技術を常に挑戦しているようです。
 * なので、APIやSDKのバージョンによって、方法が異なったりします。
 *
 * 適切な参考のドキュメンテーションがに困ることがあると思うので、
 * 参考してきたものを、ここに残しておきます。～ラス
 *
 * Dealing with race condition
 * https://www.docusign.com/blog/developers/trending-topics-latest-our-forums-october-2021
 *
 * Event Triggers
 * https://developers.docusign.com/platform/webhooks/connect/event-triggers/
 *
 * Things to note
 */

import {RequestHandler} from 'express';
import {updateKintone} from './updateKintone';


export const handleTriggers: RequestHandler = async (req, res) =>{
  try {
    const payload: ConnectEvent = req.body;
    const {
      event,
      data,
    } = payload;

    let message = 'Handled by the server.';

    switch (event) {
      case 'envelope-sent':
      case 'envelope-completed':
        await updateKintone(payload);
        break;
      default:
        message = 'This event is unhandled';
    }

    console.log(event, data.envelopeId);
    res.status(200).send(message);
  } catch (err: any) {
    // Docusign connect must always received 200 success
    res.status(201).send(`Error. ${err.message}`);
  }
};


