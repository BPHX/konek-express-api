import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import PermissionService from './permission-service';
import requestHandler from '../utils/request-handler';
import { BadRequestError } from '../utils/middlewares/error-handler';
import protect from '../utils/middlewares/protect';

const router : any = express.Router();
router.basePath = "/permission";

router.get("/", protect('user:create'), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const permissionService = context.resolve("permissionService") as PermissionService;
  return await permissionService.find(params.id);
}));

export default router;