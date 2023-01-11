import { Config } from "../types";
import { ConfigCols, ConfigTbl } from "../_schema";

class ConfigStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get config() {
    return this.db(ConfigTbl);
  }

  async get() : Promise<Config> {
    return await this.config.select(ConfigCols).orderBy(ConfigCols.timestamp, 'desc').first();
  }
  
}

export default ConfigStore;