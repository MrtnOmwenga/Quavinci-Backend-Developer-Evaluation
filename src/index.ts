import app from './App';
import config from './utils/config';
import log from './utils/logger';
import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  // Check if MONGODB_URI is defined before using it
  if (config.MONGODB_URI) {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  } else {
    console.error('MONGODB_URI is not defined in the configuration');
  }
}


const start = async (): Promise<void> => {
  try {
    // Connect to mongodb
    connectToDatabase();

    // Start app
    app.listen(config.PORT, () => {
      log.info(`Server started on port ${config.PORT}`);
    });
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

void start();