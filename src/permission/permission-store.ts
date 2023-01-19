import { Permission, SearchFilter } from "../types";
import { PermissionCols, PermissionTbl } from "../_schema";

class PermissionStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get permission() {
    return this.db(PermissionTbl);
  }

  async get(id: string) : Promise<Permission> {
    return await this.permission.select(PermissionCols).where(PermissionCols.id, id).first();
  }

  async find(params?: SearchFilter) : Promise<Permission[]> {
    return await this.permission.select(PermissionCols).
      whereLike(PermissionCols.id, `%${params?.search || ''}%`);
  }

  async create(user: Permission) : Promise<Permission> {
    return {};
  }

  async update(permission: Permission) : Promise<Permission> {
    return await this.permission.update(PermissionCols).where(PermissionCols.id, permission.id);
  }

  async verify(permissions: string[]) {
    return await this.permission.select([PermissionCols.id]).whereIn(PermissionCols.id, permissions || []);
  }

  async delete(id: number) : Promise<void> {
  }
  
}

export default PermissionStore;