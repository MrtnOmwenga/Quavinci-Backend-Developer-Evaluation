import bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from 'express';
import { UserModel, Users } from "../models/users";
import config from '../utils/config';

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

    if (!name || !email || !password) {
        return response.status(400).send('Invalid Name, Email or Password');
    }

    if (password.length < 3) {
        return response.status(400).send('Password must be at least three chatacters');
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const NewStudent = new UserModel({
        name,
        email,
        password: passwordHash,
    });

    const result = await NewStudent.save();

    const forToken = {
        name: result.name,
        id: result.id,
    };
    const token = jwt.sign(forToken, SECRET);

    return response
        .status(200)
        .json({ token, name: result.name, id: result.id, email: result.email });
});

export default OtherRoutes