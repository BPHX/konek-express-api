import { Request, RequestHandler, Response } from "express";

function requestHandler(request: Function): RequestHandler<any> {
  return (req: Request, res: Response, next: Function) => {
    try {
      const response = request(req, res, next);
      if (response instanceof Promise) {
        response
        .then((data: any) => {
          if (data !== undefined)
            res.send(data);
        }).catch((err: Error) => next(err));
      } else {
        if (response !== undefined)
         res.send(response);
      }
    } catch(err) {
      next(err);
    } 
  };
}

export default requestHandler;