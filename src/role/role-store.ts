
export const ROLE_TABLE = "acc_role";

export const ROLE_COLS = {
  id: `${ROLE_TABLE}.roleid`,
  name: `${ROLE_TABLE}.name`,
  description: `${ROLE_TABLE}.description`,
  assignable: `${ROLE_TABLE}.assignable`,
  enabled: `${ROLE_TABLE}.enabled`,
  timestamp: `${ROLE_TABLE}.timestmp`,
};

export interface Role {
  id?: string | number,
  name?: string,
  description?: string,
  timestamp?: Date,
  assignable?: boolean,
  enabled?: boolean,
};

class RoleStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get role() {
    return this.db(ROLE_TABLE);
  }

  async get(id: string) : Promise<Role> {
    return await this.role.select(ROLE_COLS).where(ROLE_COLS.id, id).first();
  }

  async find(params: any) : Promise<Role[]>{
    return await this.role.select(ROLE_COLS);
  }

  async create(user: Role) : Promise<Role> {
    return {};
  }

  async update(user: Role) : Promise<Role> {
    return await this.role.update(ROLE_COLS).where(ROLE_COLS.id, user.id);
  }

  async delete(id: number) : Promise<void> {
  }
  
}

export default RoleStore;