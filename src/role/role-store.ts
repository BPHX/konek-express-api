import PermissionStore from "../permission/permission-store";
import { Role, RoleFilter } from "../types";
import { PermissionCols, PermissionTbl, RoleCols, RoleRealCols, RoleTbl } from "../_schema";
import { RolePermissionCols, RolePermissionRealCols, RolePermissionTbl } from "../_schema/role-permission";

class RoleStore {

  db : any;

  constructor({db, permissionStore}: any) {
    this.db = db;
  }

  get role() {
    return this.db(RoleTbl);
  }

  get rolePermission() {
    return this.db(RolePermissionTbl);
  }

  async get(id: string) : Promise<Role> {
    return await this.role.select(RoleCols).where(RoleCols.id, id).first();
  }

  async getByName(name: string) : Promise<Role> {
    return await this.role.select(RoleCols).where(RoleCols.name, name).first();
  }

  async exists(id?: string) : Promise<boolean> {
    const user = await this.role
    .select({exists: 1})
    .where(RoleCols.id, id)
    .first();
    return Boolean(user);
  }

  async getPermissions(id: string): Promise<string[]> {
    const permissions = await this.role
    .select(PermissionCols)
    .leftJoin(RolePermissionTbl, RolePermissionCols.role, RoleCols.id)
    .leftJoin(PermissionTbl, PermissionCols.id, RolePermissionCols.permission)
    .where(RoleCols.id, id)
    .andWhere(RoleCols.enabled, true);
    return permissions.map((r:any) => r.id);
  }

  async find(filters: RoleFilter) : Promise<Role[]> {
    const query = this.role.select(RoleCols)
      .whereILike(RoleCols.name, `%${ filters?.search || '' }%`);
    if (filters?.enabled !== undefined) {
      query.andWhere(RoleCols.enabled, filters?.enabled);
    }
    return await query;
  }

  async create(role: Role) : Promise<Role> {
    const [{ roleid }] = await this.role.insert({
      [RoleRealCols.name]: role.name,
      [RoleRealCols.description]: role.description,
    }).returning(RoleCols.id);
    return await this.get(roleid);
  }

  async removePermissions(roleid: string, permissions: string[]) : Promise<void> {
    if (permissions.length)
    await this.rolePermission
      .whereIn(RolePermissionCols.permission, permissions)
      .andWhere(RolePermissionRealCols.role, roleid)
      .delete();
  };

  async addPermissions(roleid: string, permissions: string[]) : Promise<void> {
    if (permissions.length)
    await this.rolePermission.insert(permissions.map(p => ({
      [RolePermissionRealCols.permission]: p,
      [RolePermissionRealCols.role]: roleid,
    })));
  };

  async update(role: Role) : Promise<Role> {
    const id = role?.id?.toString() || '';
    await this.role.update({
      [RoleRealCols.name]: role.name,
      [RoleRealCols.description]: role.description,
      [RoleRealCols.enabled]: role.enabled, 
    }).where(RoleCols.id, role.id);
    return role;
  }

  async delete(id: number) : Promise<void> {
  }
  
}

export default RoleStore;