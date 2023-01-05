import { RequestHandler, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AuthService from "../../auth/auth-service";
import { AppRequest } from "../../_app";
import { ForbiddenError, UnauthorizedError } from "./error-handler";

function protect(...acl: string[]): RequestHandler<any> {
  return async (req: Request, res: Response, next: Function) => {
    const { context, headers } = req as AppRequest;
    const authService = context.resolve("authService") as AuthService;
    if (!headers?.authorization)
      next(new UnauthorizedError("Authorization header not found"));
    else
      try {
        const decodedToken = authService.verify(headers.authorization) as JwtPayload;
        const authorized = await authService.isAuthorized(decodedToken.userId, ...acl);
        if (!authorized)
          throw new ForbiddenError("User does not have permission to access this resource");
        next();
      } catch(err) {
        next(err);
      }
  };
}

export default protect;