import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import UserService from './user-service';
import requestHandler from '../utils/request-handler';
import { BadRequestError } from '../utils/middlewares/error-handler';
import protect from '../utils/middlewares/protect';

const router = express.Router();

router.get("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return await userService.get(params.id);
}));

router.get("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return await userService.find(null);
}));

router.post("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, body: user } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  return await userService.create(user);
}));

router.put("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: user } = req as AppRequest;

  if (!user?.id || user?.id !== params?.id)
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