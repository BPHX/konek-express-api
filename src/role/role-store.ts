import { Role } from "../types";
import { PermissionCols, PermissionTbl, RoleCols, RoleTbl } from "../_schema";
import { RolePermissionCols, RolePermissionTbl } from "../_schema/role-permission";

class RoleStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get role() {
    return this.db(RoleTbl);
  }

  async get(id: string) : Promise<Role> {
    return await this.role.select(RoleCols).where(RoleCols.id, id).first();
  }

  async exists(id?: string) : Promise<boolean> {
    const user = await this.role
    .select({exists: 1})
    .where(RoleCols.id, id)
    .first();
    return Boolean(user);
  }

  async getPermissions(id: string) {
    const permissions = await this.role
    .select(PermissionCols)
    .leftJoin(RolePermissionTbl, RolePermissionCols.role, RoleCols.id)
    .leftJoin(PermissionTbl, PermissionCols.id, RolePermissionCols.permission)
    .where(RoleCols.id, id)
    .andWhere(RoleCols.enabled, true);
    return permissions.map((r:any) => r.id);
  }

  async find(params: any) : Promise<Role[]>{
    return await this.role.select(RoleCols);
  }

  async create(user: Role) : Promise<Role> {
    return {};
  }

  async update(user: Role) : Promise<Role> {
    return await this.role.update(RoleCols).where(RoleCols.id, user.id);
  }

  async delete(id: number) : Promise<void> {
  }
  
}

export default RoleStore;