import { asClass } from 'awilix';
import AuditStore from './store';

const auditContext = {
  auditStore: asClass(AuditStore).scoped(),
};

export default auditContext;