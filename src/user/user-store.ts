import { parseByKeys, toJSONQuery } from "../utils/query-helper";
import { identity, User, UserFilter } from "../types";
import { PermissionCols, PermissionTbl, RoleCols, RoleTbl, UserCols, UserRealCols, UserRoleCols, UserRoleRealCols, UserRoleTbl, UserTbl } from "../_schema";
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

  get roles() {
    return this.db(UserRoleTbl);
  }

  select(builder?: Function) {
    let query = this.users.select({
      ...UserCols,
      roles: this.db.raw(`JSON_AGG(JSON_BUILD_OBJECT(${toJSONQuery({id: RoleCols.id, name: RoleCols.name})}))`)
    }).leftJoin(UserRoleTbl, UserCols.id, UserRoleCols.user)
    .leftJoin(RoleTbl, UserRoleCols.role, RoleCols.id);
    builder?.(query);
    query.groupBy(UserCols.id);
    query.orderBy(1);
    return query;
  }

  async get(id: identity) {
    const user = await this.select()
    .where(UserCols.id, id)
    .first();
    return user;
  }

  async exists(id?: identity) : Promise<boolean> {
    const user = await this.users
    .select({exists: 1})
    .where(UserCols.id, id)
    .first();
    return Boolean(user);
  }

  async existsByUsername(username: string) : Promise<boolean> {
    const user = await this.users
    .select({exists: 1})
    .where(UserCols.username, username)
    .first();
    return Boolean(user);
  }

  async getByUsername(username: string) {
    return await this.select()
    .where(UserCols.username, username)
    .first();
  }

  async find(params: UserFilter) {
    return await this.select((query: any) => {
      if (params.search)
      query
        .whereILike(UserCols.firstname, `%${params.search}%`)
        .orWhereILike(UserCols.lastname, `%${params.search}%`)
    });
  }

  async create(user: User) {
    delete user.timestamp;
    const entity = parseByKeys(user, UserRealCols);
    const [ {userid} ] = await this.users.insert(entity).returning(UserRealCols.id);
    return userid;
  }

  async update({id, ...user}: User) {
    const info = parseByKeys(user, UserRealCols);
    return await this.users.update(info).where(UserCols.id, id);
  }

  async delete(id: number) {
    return id;
  }
  
  async getPermissions(id: identity) {
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

  async getRoles(id: identity) {
    const roles = await this.users
    .select(RoleCols)
    .leftJoin(UserRoleTbl, UserRoleCols.user, UserCols.id)
    .leftJoin(RoleTbl, RoleCols.id, UserRoleCols.role)
    .where(UserCols.id, id)
    .andWhere(RoleCols.enabled, true);
    return roles;
  }

  async addRoles(id: identity, roles: string[]) {
    if (roles.length)
    await this.roles.insert(roles.map(p => ({
      [UserRoleRealCols.role]: p,
      [UserRoleRealCols.user]: id,
    })));
  }

  async removeRoles(id: identity, roles: string[]) {
    if (roles.length)
    await this.roles
      .whereIn(UserRoleRealCols.role, roles)
      .andWhere(UserRoleRealCols.user, id)
      .delete();
  }
}

export default UserStore;