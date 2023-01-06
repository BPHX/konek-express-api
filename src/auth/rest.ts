import express, { Request } from 'express';
import requiresKey from '../utils/middlewares/requires-key';
import requestHandler from '../utils/request-handler';
import { AppRequest } from '../_app';
import AuthService from './auth-service';

const router : any = express.Router();
router.basePath = "/auth";

router.post("/authenticate", requiresKey(), requestHandler(async (req: Request, res: Response) => {
  const { context, body } = req as AppRequest;
  const authService = context.resolve("authService") as AuthService;
  const { username, secret } = body;
  return authService.signIn(username, secret);
}));

export default router;