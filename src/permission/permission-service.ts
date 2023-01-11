import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { Permission } from "../types";
import PermissionStore from "./permission-store";

class PermissionService {

  store: PermissionStore;

  constructor({permissionStore}: any) {
    this.store = permissionStore;
  }

  async get(id: string) : Promise<Permission> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("User not found");
    }
    return result;
  }

  async find(filters: any) : Promise<Permission[]> {
    const result = await this.store.find(filters || {});
    return result;
  }

  async create(user: Permission) {
    if (user.id) {
      throw new BadRequestError("New user should not contain user id");
    }
    return await this.store.create(user);
  }

  async update(user: Permission) {
    return await this.store.update(user);
  }

  async delete(id: number) {
    return await this.store.delete(id);
  }
}

export default PermissionService;