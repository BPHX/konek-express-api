import { asClass, asValue } from 'awilix';
import AuthService from './auth-service';

const authContext = {
  auth: asValue({
    key: process.env.AUTH_SERVICE_KEY,
    type: process.env.AUTH_TYPE,
    salt: process.env.AUTH_SALT,
    expiry: process.env.SESSION_TIMEOUT,
  }),
  authService: asClass(AuthService).scoped(),
};

export default authContext;