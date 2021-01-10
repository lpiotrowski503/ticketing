import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  CustomError,
  currentUser
} from '@lpiotrowski503tickets/common';
import cookieSession from 'cookie-session';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

app.use(currentUser)
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)

app.all(
  '*',
  async (): Promise<CustomError> => {
    throw new NotFoundError();
  }
);

app.use(errorHandler);

export { app };
