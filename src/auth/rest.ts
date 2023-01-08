import express, { Request } from 'express';
import UserService from '../user/user-service';
import { UnauthorizedError } from '../utils/middlewares/error-handler';
import protect from '../utils/middlewares/protect';
import requiresKey from '../utils/middlewares/requires-key';
import requestHandler from '../utils/request-handler';
import { AppRequest } from '../_app';
import AuthService from './auth-service';

const router : any = express.Router();

router.post("/signin", requiresKey(), requestHandler(async (req: Request, res: Response) => {
  const { context, body } = req as AppRequest;
  const authService = context.resolve("authService") as AuthService;
  const { username, secret } = body;
  return authService.signIn(username, secret);
}));

router.get("/whoami", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, userid } = req as AppRequest;
  const userService = context.resolve("userService") as UserService;
  if (!userid)
    throw new UnauthorizedError("Invalid User");
  const user = await userService.get(userid);
  return user;
}));

router.post("/verify", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, body, userid } = req as AppRequest;
  const authService = context.resolve("authService") as AuthService;
  const allowed = await authService.isAuthorized(userid, body?.permissions || []);
  return { allowed };
}));

export default router;