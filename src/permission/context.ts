import { asClass } from 'awilix';
import PermissionService from './permission-service';
import PermissionStore from './permission-store';

const permissionContext = {
  permissionStore: asClass(PermissionStore).scoped(),
  permissionService: asClass(PermissionService).scoped(),
};

export default permissionContext;