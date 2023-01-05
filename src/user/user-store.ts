import { Role, ROLE_COLS, ROLE_TABLE } from "../role/role-store";
import { parseByKeys, toJSONQuery } from "../utils/query-helper";

export const USER_TABLE = "acc_user";

export const USER_COLS = {
  id: `${USER_TABLE}.userid`,
  username: `${USER_TABLE}.username`,
  secret: `${USER_TABLE}.secret`,
  email: `${USER_TABLE}.email`,
  firstname: `${USER_TABLE}.firstname`,
  lastname: `${USER_TABLE}.lastname`,
  middlename: `${USER_TABLE}.middlename`,
  dob: `${USER_TABLE}.dob`,
  gender: `${USER_TABLE}.gender`,
  timestamp: `${USER_TABLE}.timestmp`,
};

export const USERROLE_TABLE = "acc_userrole";

export const USERROLE_COLS = {
  id: `${USERROLE_TABLE}.userroleid`,
  user: `${USERROLE_TABLE}.userid`,
  role: `${USERROLE_TABLE}.roleid`,
  timestamp: `${USERROLE_TABLE}.timestmp`,
};

export interface User {
  id?: string | number,
  username?: string,
  secret?: string,
  firstname?: String,
  middlename?: String,
  lastname?: String,
  dob?: Date,
  gender?: String,
  timestamp?: Date,
  creator?: User | string | number,
  roles?: Role[],
};

class UserStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get users() {
    return this.db(USER_TABLE);
  }

  get select() {
    return this.users.select({
      ...USER_COLS,
      roles: this.db.raw(`JSON_ARRAYAGG(JSON_OBJECT(${toJSONQuery({id: ROLE_COLS.id, name: ROLE_COLS.name})}))`)
    })
    .leftJoin(USERROLE_TABLE, USER_COLS.id, USERROLE_COLS.user)
    .leftJoin(ROLE_TABLE, USERROLE_COLS.role, ROLE_COLS.id)
    .groupBy(USER_COLS.id);
  }

  async get(id: string) {
    return await this.select
    .where(USER_COLS.id, id)
    .first();
  }

  async getByUsername(username: string) {
    return await this.select
    .where(USER_COLS.username, username)
    .first();
  }

  async find(params: any) {
    return await this.select;
  }

  async create(user: User) {
    delete user.timestamp;
    const entity = parseByKeys(user, USER_COLS);
    const [ id ] = await this.users.insert(entity);
    return id;
  }

  async update(user: User) {
    return await this.users.update(USER_COLS).where(USER_COLS.id, user.id);
  }

  async delete(id: number) {
    return id;
  }
  
}

export default UserStore;