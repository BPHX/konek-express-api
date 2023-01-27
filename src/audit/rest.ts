import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import protect from '../utils/middlewares/protect';
import requestHandler from '../utils/request-handler';
import AuditService from './audit-service';

const router : any = express.Router();
router.basePath = "/audit";

router.get("/", protect("audit:view"), requestHandler(async (req: Request, res: Response) => {
  const { context, query: filter } = req as AppRequest;
  console.log(filter);
  const service = context.resolve("auditService") as AuditService;
  return await service.find(filter);
}));

export default router;