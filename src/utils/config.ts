import dotenv from 'dotenv';
dotenv.config();

// Get environment variables
const { PORT } = process.env;
const { MONGODB_URI} = process.env
const { SECRET } = process.env

export default {
  PORT,
  MONGODB_URI,
  SECRET,
};