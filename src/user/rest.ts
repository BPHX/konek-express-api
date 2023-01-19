import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import UserService from './user-service';
import requestHandler from '../utils/request-handler';
import { BadRequestError } from '../utils/middlewares/error-handler';
import protect from '../utils/middlewares/protect';

const router: any = express.Router();
router.basePath = "/user";

router.get("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return await userService.get(params.id);
}));

router.get("/:id/permissions", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return userService.getPermissions(params.id);
}));

router.get("/:id/roles", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return userService.getRoles(params.id);
}));

router.post("/:id/reset-password", protect("user:password:reset"), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return userService.resetPassword(params.id);
}));

router.get("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, query } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return await userService.find(query);
}));

router.post("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, body: user } = req as AppRequest;
  if (user.id)
    throw new BadRequestError("New user should not contain user id");

  const userService = context.resolve("userService") as UserService;
  const created = await userService.create(user);
  return created;
}));

router.put("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: user } = req as AppRequest;

  if (!user?.id || user?.id?.toString() !== params?.id?.toString())
    throw new BadRequestError(`The provided id does not matched.`);

  const userService = context.resolve("userService") as UserService;
  return await userService.update({ ...user });
}));

// router.delete("/:id", async (req: Request, res: Response) => {
//   const { context, params } = req as AppRequest;
//   const userService = context.resolve("userService") as UserService;
//   res.send(await userService.delete(parseInt(params.id)));
// });

export default router;