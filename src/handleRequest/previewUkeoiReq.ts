import {RequestHandler} from 'express';
import path from 'path';

export const previewUkeoiReq: RequestHandler = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '__TEST__', 'test.xlsx'));
};
