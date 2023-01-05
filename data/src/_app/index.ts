import { AwilixContainer, createContainer, asValue, asFunction, InjectionMode } from 'awilix';
import express, { Request } from 'express';
import appContext from './context';
import initDB from './db';
import restService from './rest';

const router = express.Router();

export interface AppContext {
  db: any,
}

export interface AppRequest extends Request {
  context: AwilixContainer<AppContext>
  dispose: Function
};

async function app(req: express.Request, res: express.Response, next: Function) {
  const appReq = req as AppRequest;
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  }); 
  const scope = container.createScope();
  scope.register({
    db: asFunction(initDB).inject(() => ({
      dbUrl: process.env.DB_URL,
    })),
  });
  scope.register(appContext);
  appReq.context = scope;
  appReq.dispose = () => {
    scope.dispose();
    container.dispose();
  };
  next();
}

router.use(app as express.RequestHandler);
router.use(restService);

export default router;