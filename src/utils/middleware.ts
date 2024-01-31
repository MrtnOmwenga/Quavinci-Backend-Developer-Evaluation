import { NextFunction, Request, Response } from 'express';
import { NotFoundError, ValidationError } from './errors';

export const errorHandlerMiddleware = (
  err: Error | NotFoundError | ValidationError,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  let statusCode = 500;
  let responseBody: { error: string; details?: any } = { error: 'Internal Server Error' };

  if (err instanceof NotFoundError) {
    statusCode = 404;
    responseBody = { error: err.message };
  } else if (err instanceof ValidationError) {
    statusCode = 400;
    responseBody = { error: err.message, details: err.details };
  }

  return response.status(statusCode).json(responseBody);
};
