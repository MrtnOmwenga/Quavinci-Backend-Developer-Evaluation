import express, { Request, Response, Application } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import UserRoutes from './controllers/users';
import OtherRoutes from './controllers/other-routes';
import config from './utils/config';
import log from './utils/logger';
import { options } from './utils/swagger';

// Parse options and read routes
const swaggerSpec = swaggerJSDoc(options);

// Connect to mongodb
const connectToDatabase = (): void => {
      // Check if MONGODB_URI is defined before using it
      if (config.MONGODB_URI) {
        try {
          mongoose.connect(config.MONGODB_URI);
          log.info('Connected to MongoDB');
        } catch (error) {
          log.error('Error connecting to MongoDB:', error);
        }
      } else {
        log.error('MONGODB_URI is not defined in the configuration');
      }
    }

log.info(`connecting to ${config.MONGODB_URI}`);
connectToDatabase();

// Initialize app
const app: Application = express();

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, { explorer: true }));

// API Routes
app.use('/api/users', UserRoutes);
app.use('/api/other', OtherRoutes);

export default app;