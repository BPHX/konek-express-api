import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import requestHandler from '../utils/request-handler';
import ConfigService from './config-service';
import requiresKey from '../utils/middlewares/requires-key';

const router : any = express.Router();

router.get("/config", requiresKey(), requestHandler(async (req: AppRequest, res: Response) => {
  const configService = req.context.resolve("configService") as ConfigService;
  const cfg = await configService.get();
  return cfg?.value || {};
}));

export default router;