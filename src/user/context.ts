import { asClass } from 'awilix';
import UserService from './user-service';
import UserStore from './user-store';

const userContext = {
  userStore: asClass(UserStore).scoped(),
  userService: asClass(UserService).scoped(),
};

export default userContext;