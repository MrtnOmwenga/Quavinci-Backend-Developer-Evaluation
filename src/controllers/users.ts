import express, { NextFunction, Request, Response, Router } from 'express';
import { validateOrReject } from 'class-validator';
import { UserModel, Users } from "../models/users";
import { errorHandlerMiddleware, requestLogger } from '../utils/middleware';
import limiter from '../utils/rate-limiter';
import log from '../utils/logger';
// import expressAsyncErrors from 'express-async-errors';

const UserRoutes: Router = Router();
// expressAsyncErrors();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve user details based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User was found and returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 id:
 *                   type: string
 *       404:
 *         description: User was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       400:
 *         description: Invalid ID was provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation error
 *                 message:
 *                   type: string
 *                   example: Invalid ID provided
 *       422:
 *         description: Database returned bad data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation error
 *                 message:
 *                   type: string
 *                   example: Database returned bad data
 *       500:
 *         description: Some unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
UserRoutes.get('/:id', async (request: Request, response: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {
    try {
      const user: Users | null = await UserModel.findById(request.params.id);

      // Chack if user was found
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      // Validate returned data
      try {
        await validateOrReject(user);
        return response.json(user);

        // Handle Database returning bad data
      } catch (errors) {
        log.error('Validation error', errors);
        return response.status(422).json({ error: 'Validation error', message: 'Database returned bad data' });
      }
      
      // Handle Invalid ID with custom message
    } catch (errors) {
      log.error('Validation error', errors);
      return response.status(400).json({ error: 'Validation error', message: 'Invalid ID provided' });
    }

    // Handle unexpected errors
  } catch (error) {
    return next(error);
  }
});

// Apply middleware
UserRoutes.use(limiter);
UserRoutes.use(requestLogger);
UserRoutes.use(errorHandlerMiddleware);

export default UserRoutes