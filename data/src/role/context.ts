import { asClass } from 'awilix';
import RoleService from './role-service';
import RoleStore from './role-store';

const userContext = {
  roleStore: asClass(RoleStore).scoped(),
  roleService: asClass(RoleService).scoped(),
};

export default userContext;