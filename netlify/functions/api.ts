import express from 'express';
import serverless from 'serverless-http';
import errorHandler from '../../src/utils/middlewares/error-handler';
import appRouter from '../../src/_app';

const app = express();

app.use(express.json());
app.use(appRouter);
app.use(errorHandler);

export const handler = serverless(app);