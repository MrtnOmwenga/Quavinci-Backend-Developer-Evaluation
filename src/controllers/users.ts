import express, { NextFunction, Request, Response, Router } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserModel, Users } from "../models/users";
import UserDTO from '../dtos/UserDTO';
import { errorHandlerMiddleware } from '../utils/middleware';
// import expressAsyncErrors from 'express-async-errors';

const UserRoutes: Router = Router();
// expressAsyncErrors();

UserRoutes.get('/:id', async (request: Request, response: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const user: Users | null = await UserModel.findById(request.params.id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const userDto = plainToClass(UserDTO, user);

    try {
      await validateOrReject(userDto);
      return response.json(userDto);
    } catch (errors) {
      return response.status(400).json({ error: 'Validation error', details: errors });
    }
  } catch (error) {
    return next(error);
  }
});

UserRoutes.use(errorHandlerMiddleware);

export default UserRoutes