import AuthRoutes from './auth/rest';
import ConfigRoutes from './config/rest';
import RoomRoutes from './room/rest';
import UserRoutes from './user/rest';
import RoleRoutes from './role/rest';
import PermissionRoutes from './permission/rest';

const routes : any = [
  AuthRoutes,
  RoomRoutes,
  UserRoutes,
  RoleRoutes,
  ConfigRoutes,
  PermissionRoutes
];

export default routes;