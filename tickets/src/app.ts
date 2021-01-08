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
import { createTicketsRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser)
app.use(createTicketsRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all(
  '*',
  async (): Promise<CustomError> => {
    throw new NotFoundError();
  }
);

app.use(errorHandler);

export { app };
