import { Room } from "../types";
import { RoomCols, RoomRealCols, RoomTbl } from "../_schema";

class RoomStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get room() {
    return this.db(RoomTbl);
  }

  async get(id: string) : Promise<Room> {
    return await this.room.select(RoomCols).where(RoomCols.id, id).first();
  }

  async getByTitle(title: string, userid?: string) : Promise<Room> {
    return await this.room.select(RoomCols).where(RoomCols.title, title).andWhere(RoomCols.userid, userid).first();
  }

  async find(params: any) : Promise<Room[]>{
    return await this.room.select(RoomCols);
  }

  async create(room: Room, userid?: string) : Promise<Room> {
    const [{ roomid }] = await this.room.insert({
      [RoomRealCols.userid]: userid,
      [RoomRealCols.title]: room.title,
      [RoomRealCols.description]: room.description,
    }).returning(RoomCols.id);
    console.log(roomid)
    return await this.get(roomid);
  }

  async update(room: Room) : Promise<Room> {
    await this.room.update({
      [RoomRealCols.title]: room.title,
      [RoomRealCols.description]: room.description,
    }).where(RoomCols.id, room.id);
    return room;
  }

}

export default RoomStore;