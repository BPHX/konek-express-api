import { NotFoundError } from "../utils/middlewares/error-handler";
import { Config } from "../types";
import ConfigStore from "./config-store";

class ConfigService {

  store: ConfigStore;

  constructor({configStore}: any) {
    this.store = configStore;
  }

  async get() : Promise<Config> {
   return await this.store.get();
  }

}

export default ConfigService;