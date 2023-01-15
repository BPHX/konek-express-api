import AuthService from "../auth/auth-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { Permission, Room} from "../types";
import RoomStore from "./room-store";

class RoomService {

  store: RoomStore;

  constructor({roomStore}: any) {
    this.store = roomStore;
  }

  async get(id: string) : Promise<Room> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("User not found");
    }
    return this._parse(result);
  }

  async find(filters: any) : Promise<Room[]> {
    const result = await this.store.find(filters);
    return result.map(this._parse);
  }

  _parse({...room}: any) : Room {
    return {...room};
  }
}

export default RoomService;