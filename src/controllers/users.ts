import express, { NextFunction, Request, Response, Router } from 'express';
import { validateOrReject } from 'class-validator';
import { UserModel, Users } from "../models/users";
import { errorHandlerMiddleware, requestLogger } from '../utils/middleware';
import limiter from '../utils/rate-limiter';
import log from '../utils/logger';
// import expressAsyncErrors from 'express-async-errors';

const UserRoutes: Router = Router();
// expressAsyncErrors();

UserRoutes.get('/:id', async (request: Request, response: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    try {
      const user: Users | null = await UserModel.findById(request.params.id);

      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      try {
        await validateOrReject(user);
        return response.json(user);
      } catch (errors) {
        log.error('Validation error', errors);
        return response.status(400).json({ error: 'Validation error', message: 'Database returned bad data', details: errors });
      }
      
    } catch (errors) {
      log.error('Validation error', errors);
      return response.status(400).json({ error: 'Validation error', message: 'Invalid ID provided', details: errors });
    }
  } catch (error) {
    return next(error);
  }
});

UserRoutes.use(limiter);
UserRoutes.use(requestLogger);
UserRoutes.use(errorHandlerMiddleware);

export default UserRoutes