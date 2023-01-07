import { Config } from "../types";
import { ConfigCols } from "../_schema";

class ConfigStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get config() {
    return this.db();
  }

  async get() : Promise<Config> {
    return await this.config.select().orderBy(ConfigCols.timestamp, 'desc').first();
  }
  
}

export default ConfigStore;