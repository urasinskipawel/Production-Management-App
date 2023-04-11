import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(err instanceof ValidationError ? 400 : 500).render('messages/error', {
    style: 'error.css',
    message: err instanceof ValidationError ? err.message : 'Sorry, please try again in a few minutes.',
    worker: req.body,
  });
};
