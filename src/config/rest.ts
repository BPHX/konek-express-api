import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import requestHandler from '../utils/request-handler';
import protect from '../utils/middlewares/protect';
import ConfigService from './config-service';

const router : any = express.Router();

router.get("/config", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const configService = context.resolve("configService") as ConfigService;
  return await configService.get();
}));

export default router;