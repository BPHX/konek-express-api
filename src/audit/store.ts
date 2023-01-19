import { Knex } from "knex";
import { AuditLog, identity } from "../types";
import { parseByKeys } from "../utils/query-helper";
import { AuditRealCols } from "../_schema";

export const EventTypes = {
  USER_CREATED: "USER_CREATED",
  USER_UPDATED: "USER_UPDATED",
  ROOM_CREATED: "ROOM_CREATED",
  ROOM_UPDATED: "ROOM_UPDATED",
};

class AuditStore {

  db : Knex;
  userid: any;

  constructor({db, userid}: any) {
    this.db = db;
    this.userid = userid;
  }

  get audit() {
    return this.db("sys_audit");
  }

  async logEvent(type :string, context: any) : Promise<number | null> {
    if (!this.userid) return null;
    const event : AuditLog = {
      type, context, userid: this.userid,
    };
    const [ { eventid } ] = await this.audit.insert(parseByKeys(event, AuditRealCols)).returning(AuditRealCols.id);
    return eventid;
  }
}

export default AuditStore;