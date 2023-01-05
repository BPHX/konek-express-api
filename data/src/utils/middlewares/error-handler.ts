import { Request, Response } from 'express';

function errorHandler(err: Error, req: Request , res: Response, next: Function) {
  if (err instanceof RestError) {
    res.statusCode = err.code;
    res.send({ message: err.message });
  } else {
    res.statusCode = 500;
    res.send({ message: err.message });
  }
}

export class RestError extends Error {
  code: number;
  constructor(name: string, message: string, code: number) {
    super(message);
    this.name = "NotFoundError";
    this.code = code;
  }
}

export class NotFoundError extends RestError {
  constructor(message: string) {
    super("NotFoundError", message, 404);
  }
}

export class BadRequestError extends RestError {
  constructor(message: string) {
    super("BadRequestError", message, 400);
  }
}

export class InternalServerError extends RestError {
  constructor(message: string) {
    super("InternalServerError", message, 500);
  }
}

export class UnauthorizedError extends RestError {
  constructor(message: string) {
    super("UnauthorizedError", message, 401);
  }
}

export class ForbiddenError extends RestError {
  constructor(message: string) {
    super("UnauthorizedError", message, 403);
  }
}

export default errorHandler;