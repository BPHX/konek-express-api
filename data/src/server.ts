import express, { Request, Response } from 'express';
import errorHandler from './utils/middlewares/error-handler';
import appRouter, { AppRequest } from './_app';

const app = express();

app.use(express.json());
app.use(appRouter);
app.use(errorHandler);

const port = process.env.PORT_NUMBER || 3000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Konek API is listening on port ${port}!`);
});
