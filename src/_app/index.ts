import { AwilixContainer, createContainer, asValue, InjectionMode } from 'awilix';
import express, { Request } from 'express';
import appContext from './context';
import initDB from './db-init';
import restService from './rest';
import cors from 'cors';

const router = express.Router();

export interface AppContext {
  db: any,
}

export interface AppRequest extends Request {
  accessToken?: string,
  userid?: string,
  context: AwilixContainer<AppContext>
  dispose: Function
};

async function app(req: express.Request, res: express.Response, next: Function) {
  const appReq = req as AppRequest;
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  }); 
  const scope = container.createScope();
  const [ db, disposeDB ] = initDB(process.env.DB_URL || '');
  scope.register({
    db: asValue(db),
  });
  scope.register(appContext);
  appReq.context = scope;
  appReq.dispose = () => {
    scope.dispose();
    container.dispose();
    disposeDB();
  };
  next();
}

router.use(cors((req, callback) => {
  var allowlist = ['http://localhost:3000', 'https://konek.netlify.app'];
  callback(null, {
    origin: allowlist.indexOf(req.header('Origin') || '') !== -1
  })
}));

router.use(app as express.RequestHandler);
router.use(restService);

export default router;