import { RequestHandler, Request, Response } from "express";
import { AppRequest } from "../../_app";
import { UnauthorizedError } from "./error-handler";

function requiresKey(): RequestHandler<any> {
  return async (req: Request, res: Response, next: Function) => {
    const { context, headers } = req as AppRequest;
    const auth = context.resolve("auth") as any;
    const apiKey = headers?.['x-api-key'];

    if (!apiKey)
      return next(new UnauthorizedError("Api key is required to access this route"));

    if (apiKey !== auth?.key)
      return next(new UnauthorizedError("Invalid api key"));

    next();
  };
}

export default requiresKey;