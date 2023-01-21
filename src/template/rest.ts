import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import protect from '../utils/middlewares/protect';
import requestHandler from '../utils/request-handler';
import TemplateService from './template-service';
import { BadRequestError } from '../utils/middlewares/error-handler';


const router : any = express.Router();
router.basePath = "/template";

router.get("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const templateService = context.resolve("templateService") as TemplateService;
  return await templateService.get(params.id);
}));

router.get("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, query } = req as AppRequest;
  const templateService = context.resolve("templateService") as TemplateService;
  return await templateService.find(query);
}));

router.post("/", protect(),  requestHandler(async (req: Request, res: Response) => {
  const { context, body: template, userid } = req as AppRequest;
  const templateService = context.resolve("templateService") as TemplateService;
  return await templateService.create(template, userid);
}));

router.put("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: template, userid } = req as AppRequest;
  if (!template?.id.toString() || template?.id.toString() !== params?.id)
    throw new BadRequestError(`The provided id does not matched.`);
    const templateService = context.resolve("templateService") as TemplateService;
    return await templateService.update({...template}, userid);
}));

export default router;