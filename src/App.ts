import express, { Request, Response, Application } from "express";
import cors from 'cors';
import UserRoutes from './controllers/users';
import OtherRoutes from './controllers/other-routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('/api/other', OtherRoutes);

export default app;