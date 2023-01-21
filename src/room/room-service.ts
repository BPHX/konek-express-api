import AuthService from "../auth/auth-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { identity, Permission, Room} from "../types";
import RoomStore from "./room-store";
import PermissionStore from "../permission/permission-store";

class RoomService {

  store: RoomStore;
  permissions: PermissionStore;

  constructor({roomStore, permissionStore}: any) {
    this.store = roomStore;
    this.permissions = permissionStore;
  }

  async get(id: string) : Promise<Room> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("Room not found");
    }
    return this._parse(result);
  }

  async find(filters: any) : Promise<Room[]> {
    const result = await this.store.find(filters);
    return result.map(this._parse);
  }

  async create(room: Room, userid?: identity ) {
    if (room.id) {
      throw new BadRequestError("New user should not contain user id");
    }
    if (!room.title)
      throw new BadRequestError("Room title is required");

    const exists = await this.store.getByRoomTitle(room.title, userid);
    if (exists)
      throw new BadRequestError(`Room with the title (${room.title}) already exists`);

    return await this.store.create(room, userid);
  }

  async update(room: Room, userid?: identity ) {
    if (!room.id)
      throw new BadRequestError("Room id is required");
    if (!room.title)
      throw new BadRequestError("Room title is required");
    const exists = await this.store.getByOtherRoomTitle(room, userid);
    if (exists)
      throw new BadRequestError(`Room with the title (${room.title}) already exist`);
    return await this.store.update(room);
  }


  _parse({...room}: any) : Room {
    return {...room};
  }
}

export default RoomService;