import { Permission } from "../types";
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

  async find(params: any) : Promise<Permission[]>{
    return await this.permission.select(PermissionCols);
  }

  async create(user: Permission) : Promise<Permission> {
    return {};
  }

  async update(user: Permission) : Promise<Permission> {
    return await this.permission.update(PermissionCols).where(PermissionCols.id, user.id);
  }

  async delete(id: number) : Promise<void> {
  }
  
}

export default PermissionStore;