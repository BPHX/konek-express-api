import { BadRequestError } from "../utils/middlewares/error-handler";


export function validateId(id: any) {
  throw new BadRequestError(`Invalid userid ${id}`);
}