import {RequestHandler} from 'express';

export const reqResendContract: RequestHandler = (
  req, res,
) => {
  res.status(200).send('success');
};
