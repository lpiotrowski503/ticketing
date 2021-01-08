import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { CurrentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import {
  errorHandler,
  NotFoundError,
  CustomError,
} from '@lpiotrowski503tickets/common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

const paths = [CurrentUserRouter, signinRouter, signupRouter, signoutRouter];

app.use(paths);

app.all(
  '*',
  async (): Promise<CustomError> => {
    throw new NotFoundError();
  }
);

app.use(errorHandler);

export { app };
