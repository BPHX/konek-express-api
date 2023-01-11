import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { Permission, Role, RoleFilter } from "../types";
import RoleStore from "./role-store";
import PermissionStore from "../permission/permission-store";

class RoleService {

  store: RoleStore;
  permissions: PermissionStore;

  constructor({ roleStore, permissionStore }: any) {
    this.store = roleStore;
    this.permissions = permissionStore;
  }

  async get(id: string): Promise<Role> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("User not found");
    }
    return this._parse(result);
  }

  async find(filters?: RoleFilter): Promise<Role[]> {
    const result = await this.store.find(filters || {});
    return result.map(this._parse);
  }

  async create(role: Role) {
    if (role.id) {
      throw new BadRequestError("New user should not contain user id");
    }
    if (!role.name)
      throw new BadRequestError("Role name is required");

    const exists = await this.store.getByName(role.name);

    if (exists)
      throw new BadRequestError(`Role with the name (${role.name}) already exists`);

    return await this.store.create(role);
  }

  async update(role: Role) {

    if (!role.id)
      throw new BadRequestError(`Role id is required`);

    if (!role.name)
      throw new BadRequestError("Role name is required");

    const exists = await this.store.getByName(role.name);
    const id = role.id.toString();

    if (exists.id !== role.id)
      throw new BadRequestError(`Role with the name (${role.name}) already exists`);

    const permissions = role.permissions || [];

    const validPermissions = await this.permissions.verify(permissions);

    if (validPermissions?.length !== role.permissions?.length)
      throw new BadRequestError(`Invalid permission found`);

    const existing = await this.store.getPermissions(id);

    // permissions that cannot be found in existing
    const toAdd = permissions.filter(p => existing.indexOf(p) === -1);

    // existing permissions that cannot be found in new permissions
    const toRemove = existing.filter(p => permissions.indexOf(p) === -1);

    await this.store.addPermissions(id, toAdd);
    await this.store.removePermissions(id, toRemove);

    return role;
  }

  async delete(id: number) {
    return await this.store.delete(id);
  }

  async getPermissions(id: string): Promise<string[]> {
    const exists = await this.store.exists(id);
    if (!exists)
      throw new NotFoundError("User not found");
    return await this.store.getPermissions(id);
  }

  _parse({ enabled, ...role }: any): Role {
    return {
      ...role,
      enabled: Boolean(enabled),
    };
  }
}

export default RoleService;