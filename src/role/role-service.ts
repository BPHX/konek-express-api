import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import RoleStore, { Role } from "./role-store";

class RoleService {

  store: RoleStore;

  constructor({roleStore}: any) {
    this.store = roleStore;
  }

  async get(id: string) : Promise<Role> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("User not found");
    }
    return this._parse(result);
  }

  async find(filters: any) : Promise<Role[]> {
    const result = await this.store.find(filters);
    return result.map(this._parse);
  }

  async create(user: Role) {
    if (user.id) {
      throw new BadRequestError("New user should not contain user id");
    }
    return await this.store.create(user);
  }

  async update(user: Role) {
    return await this.store.update(user);
  }

  async delete(id: number) {
    return await this.store.delete(id);
  }

  _parse({assignable, enabled, ...role}: any) : Role {
    return {
      ...role,
      assignable:Boolean(role.assignable),
      enabled:Boolean(role.enabled),
    };
  }
}

export default RoleService;