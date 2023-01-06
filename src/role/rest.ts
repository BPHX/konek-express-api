import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import RoleService from './role-service';
import requestHandler from '../utils/request-handler';
import { BadRequestError } from '../utils/middlewares/error-handler';
import protect from '../utils/middlewares/protect';

const router : any = express.Router();
router.basePath = "/role";

router.get("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const roleService = context.resolve("roleService") as RoleService;
  return await roleService.get(params.id);
}));

router.get("/:id/permissions", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const roleService = context.resolve("roleService") as RoleService;
  return await roleService.getPermissions(params.id);
}));

router.get("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context } = req as AppRequest;
  const roleService = context.resolve("roleService") as RoleService;
  return await roleService.find(null);
}));

router.post("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, body: user } = req as AppRequest;
  const roleService = context.resolve("roleService") as RoleService;
  return await roleService.create(user);
}));

router.put("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: user } = req as AppRequest;

  if (!user?.id || user?.id !== params?.id)
    throw new BadRequestError(`The provided id does not matched.`);
  const roleService = context.resolve("roleService") as RoleService;
  return await roleService.update({...user});
}));

// router.delete("/:id", async (req: Request, res: Response) => {
//   const { context, params } = req as AppRequest;
//   const roleService = context.resolve("roleService") as RoleService;
//   res.send(await roleService.delete(parseInt(params.id)));
// });

export default router;