import { Room } from "../types";
import { PermissionCols, PermissionTbl, RoomCols, RoomTbl } from "../_schema";
import { RolePermissionCols, RolePermissionTbl } from "../_schema/role-permission";

class RoomStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get role() {
    return this.db(RoomTbl);
  }

  async get(id: string) : Promise<Room> {
    return await this.role.select(RoomCols).where(RoomCols.id, id).first();
  }

  async find(params: any) : Promise<Room[]>{
    return await this.role.select(RoomCols);
  }

}

export default RoomStore;