import { RequestHandler, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AuthService from "../../auth/auth-service";
import { AppRequest } from "../../_app";
import { ForbiddenError, UnauthorizedError } from "./error-handler";

function protect(...acls: string[]): RequestHandler<any> {
  return async (req: Request, res: Response, next: Function) => {
    const appReq = req as AppRequest;
    const { context, headers } = appReq;
    const authService = context.resolve("authService") as AuthService;
    if (!headers?.authorization)
      next(new UnauthorizedError("Authorization header not found"));
    else
      try {
        const decodedToken = authService.verify(headers.authorization) as JwtPayload;
        const authorized = await authService.isAuthorized(decodedToken.userId, ...acls);
        if (!authorized)
          throw new ForbiddenError("User does not have permission to access this resource");
        appReq.accessToken = headers.authorization.split(' ')[1];
        appReq.userid = decodedToken?.userId;
        next();
      } catch (err) {
        next(err);
      }
  };
}

export default protect;