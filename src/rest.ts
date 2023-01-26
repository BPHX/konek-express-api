import AuthRoutes from './auth/rest';
import ConfigRoutes from './config/rest';
import RoomRoutes from './room/rest';
import TemplateRoutes from './template/rest';
import UserRoutes from './user/rest';
import RoleRoutes from './role/rest';
import PermissionRoutes from './permission/rest';
import AuditRoutes from './audit/rest';
import { Router } from 'express';

const routes: Router[] = [
  AuthRoutes,
  RoomRoutes,
  TemplateRoutes,
  UserRoutes,
  RoleRoutes,
  ConfigRoutes,
  PermissionRoutes,
  AuditRoutes,
];

export default routes;