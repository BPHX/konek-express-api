import { parseByKeys, toJSONQuery } from "../utils/query-helper";
import { User } from "../types";
import { PermissionCols, PermissionTbl, RoleCols, RoleTbl, UserCols, UserRoleCols, UserRoleTbl, UserTbl } from "../_schema";
import { NotFoundError } from "../utils/middlewares/error-handler";
import { RolePermissionCols, RolePermissionTbl } from "../_schema/role-permission";

class UserStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get users() {
    return this.db(UserTbl);
  }

  get permissions() {
    return this.db(PermissionTbl);
  }

  get select() {
    return this.users.select({
      ...UserCols,
      roles: this.db.raw(`JSON_AGG(JSON_BUILD_OBJECT(${toJSONQuery({id: RoleCols.id, name: RoleCols.name})}))`)
    })
    .leftJoin(UserRoleTbl, UserCols.id, UserRoleCols.user)
    .leftJoin(RoleTbl, UserRoleCols.role, RoleCols.id)
    .groupBy(UserCols.id);
  }

  async get(id: string) {
    const user = await this.select
    .where(UserCols.id, id)
    .first();
    return user;
  }

  async exists(id?: string) : Promise<boolean> {
    const user = await this.users
    .select({exists: 1})
    .where(UserCols.id, id)
    .first();
    return Boolean(user);
  }

  async getByUsername(username: string) {
    return await this.select
    .where(UserCols.username, username)
    .first();
  }

  async find(params: any) {
    return await this.select;
  }

  async create(user: User) {
    delete user.timestamp;
    const entity = parseByKeys(user, UserCols);
    const [ id ] = await this.users.insert(entity);
    return id;
  }

  async update(user: User) {
    await this.users.get(user.id);
    return await this.users.update(UserCols).where(UserCols.id, user.id);
  }

  async delete(id: number) {
    return id;
  }
  
  async getPermissions(id: string) {
    const permissions = await this.users
    .select(PermissionCols)
    .distinct()
    .leftJoin(UserRoleTbl, UserRoleCols.user, UserCols.id)
    .leftJoin(RoleTbl, RoleCols.id, UserRoleCols.role)
    .leftJoin(RolePermissionTbl, RolePermissionCols.role, RoleCols.id)
    .leftJoin(PermissionTbl, PermissionCols.id, RolePermissionCols.permission)
    .where(UserCols.id, id)
    .andWhere(RoleCols.enabled, true);
    return permissions.map((r:any) => r.id);
  }

  async getRoles(id: string) {
    const roles = await this.users
    .select(RoleCols)
    .leftJoin(UserRoleTbl, UserRoleCols.user, UserCols.id)
    .leftJoin(RoleTbl, RoleCols.id, UserRoleCols.role)
    .where(UserCols.id, id)
    .andWhere(RoleCols.enabled, true);
    return roles;
  }
}

export default UserStore;