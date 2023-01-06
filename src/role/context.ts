import { asClass } from 'awilix';
import RoleService from './role-service';
import RoleStore from './role-store';

const roleContext = {
  roleStore: asClass(RoleStore).scoped(),
  roleService: asClass(RoleService).scoped(),
};

export default roleContext;