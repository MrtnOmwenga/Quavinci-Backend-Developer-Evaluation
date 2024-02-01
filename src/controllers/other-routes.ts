import bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { UserModel, Users } from "../models/users";
import { UserDto } from '../dtos/UserDTO';
import config from '../utils/config';
import log from '../utils/logger';

const OtherRoutes: Router = Router();

const SECRET = config.SECRET;
if (!SECRET) {
  // Handle the case where SECRET is not defined
  throw new Error('SECRET is not defined in the environment variables');
}

OtherRoutes.get('/test', (request: Request, response: Response): Response => {
      return response.json({ message: "Success" });
});

OtherRoutes.get("/", async (request: Request, response: Response): Promise<Response> => {
      const AllUsers: Users[] = await UserModel.find({});
      return response.status(200).json(AllUsers);
});

OtherRoutes.post("/", async (request: Request, response: Response): Promise<Response> => {
    const { name, email, password } = request.body;

    // Validate user data
    try {
        const idDto = plainToClass(UserDto, { name, email, password });
        await validateOrReject(idDto);
    } catch (error) {
        log.error('Validation error', error);
        return response.status(400).json({ error: 'Validation error', message: 'Invalid ID provided' });
    }

    // Create and save user data
    const NewStudent = new UserModel({
        name,
        email,
        password: await bcryptjs.hash(password, 10),
    });
    const result = await NewStudent.save();

    // Create token
    const token = jwt.sign({
        name: result.name,
        id: result.id,
    }, SECRET);

    // Return data
    return response
        .status(200)
        .json({ token, name: result.name, id: result.id, email: result.email });
});

export default OtherRoutes