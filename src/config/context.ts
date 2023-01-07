import { asClass } from 'awilix';
import ConfigService from './config-service';
import ConfigStore from './config-store';

const roleContext = {
  configStore: asClass(ConfigStore).scoped(),
  configService: asClass(ConfigService).scoped(),
};

export default roleContext;