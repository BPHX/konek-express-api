import { identity, Room } from "../types";
import { RoomCols, RoomRealCols, RoomTbl } from "../_schema";

class RoomStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get room() {
    return this.db(RoomTbl);
  }

  async get(id: identity) : Promise<Room> {
    return await this.room.select(RoomCols).where(RoomCols.id, id).first();
  }

  async getByRoomTitle(title: string, userid?: identity) : Promise<Room> {
    return await this.room.select(RoomCols).where(RoomCols.title, title).andWhere(RoomCols.room_userid, userid).first();
  }

  async getByOtherRoomTitle(room: Room, userid?: identity) : Promise<Room> {
    return await this.room
      .select(RoomCols)
      .where(RoomCols.title, room.title)
      .andWhere(RoomCols.room_userid, userid)
      .whereNot(RoomCols.id, '=', room.id)
      .first();
  }

  async find(params: any) : Promise<Room[]>{
    return await this.room.select(RoomCols);
  }

  async create(room: Room, userid?: identity) : Promise<Room> {
    const [{ roomid }] = await this.room.insert({
      [RoomRealCols.room_userid]: userid,
      [RoomRealCols.start]: room.start,
      [RoomRealCols.end]: room.end,
      [RoomRealCols.day]: room.day,
      [RoomRealCols.title]: room.title,
      [RoomRealCols.description]: room.description,
    }).returning(RoomCols.id);
    return await this.get(roomid);
  }

  async update(room: Room) : Promise<Room> {
    await this.room.update({
      [RoomRealCols.start]: room.start,
      [RoomRealCols.end]: room.end,
      [RoomRealCols.day]: room.day,
      [RoomRealCols.title]: room.title,
      [RoomRealCols.description]: room.description,
    }).where(RoomCols.id, room.id);
    return room;
  }

}

export default RoomStore;