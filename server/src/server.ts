import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';
import * as dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { connectDb, initDb } from './db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL!,
}));

app.use('/api', authRouter);
app.use('/api', usersRouter);

app.use(errorMiddleware);

const start = async () => {
  await connectDb();
  await initDb();

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server started on port ${PORT}`);
  });
};

await start();
