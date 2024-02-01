import express, { Request, Response, Application } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import UserRoutes from './controllers/users';
import OtherRoutes from './controllers/other-routes';
import config from './utils/config';
import log from './utils/logger';

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

// Connect to mongodb
log.info(`connecting to ${config.MONGODB_URI}`);
connectToDatabase();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('/api/other', OtherRoutes);

export default app;