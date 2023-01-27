import { Knex } from "knex";
import { AuditFilter, AuditLog } from "../types";
import { parseByKeys, toJSONQuery } from "../utils/query-helper";
import { AuditCols, AuditRealCols, PublicUserCols, UserTbl } from "../_schema";

export const EventTypes = {
  USER_CREATED: "USER_CREATED",
  USER_UPDATED: "USER_UPDATED",
  ROOM_CREATED: "ROOM_CREATED",
  ROOM_UPDATED: "ROOM_UPDATED",
};

class AuditStore {

  db: Knex;
  userid: any;

  constructor({ db, userid }: any) {
    this.db = db;
    this.userid = userid;
  }

  get audit() {
    return this.db("sys_audit");
  }

  async find(filter?: AuditFilter): Promise<AuditLog[]> {
    const logs = await this.audit.select({
      ...AuditCols,
      user: this.db.raw(`JSON_BUILD_OBJECT(${toJSONQuery(PublicUserCols)})`)
    }).leftJoin(UserTbl, AuditCols.userid, PublicUserCols.id).orderBy(1, "desc");
    return logs;
  }

  async logEvent(type: string, context: any): Promise<number | null> {
    if (!this.userid) return null;
    const event: AuditLog = {
      type, context, userid: this.userid,
    };
    const [{ eventid }] = await this.audit.insert(parseByKeys(event, AuditRealCols)).returning(AuditRealCols.id);
    return eventid;
  }
}

export default AuditStore;