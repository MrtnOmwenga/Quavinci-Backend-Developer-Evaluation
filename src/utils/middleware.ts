import { NextFunction, Request, Response } from 'express';
import { NotFoundError, ValidationError } from './errors';
import log from './logger';

//  Logs all requests on the console.
export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  log.info('Method:', request.method);
  log.info('Path:  ', request.path);
  log.info('Body:  ', request.body);
  log.info('Time:  ', new Date());
  log.info('---');
  next();
};

// Handles all unexpected errors
export const errorHandlerMiddleware = (
  err: Error | NotFoundError | ValidationError,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  let statusCode = 500;
  let responseBody: { error: string; details?: any } = { error: 'Internal Server Error' };

  // Check for the most common unexpected errors
  if (err instanceof NotFoundError) {
    statusCode = 404;
    responseBody = { error: err.message };
  } else if (err instanceof ValidationError) {
    statusCode = 400;
    responseBody = { error: err.message, details: err.details };
  }

  return response.status(statusCode).json(responseBody);
};
