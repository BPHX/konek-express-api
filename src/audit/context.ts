import { asClass } from 'awilix';
import AuditService from './audit-service';
import AuditStore from './audit-store';

const auditContext = {
  auditStore: asClass(AuditStore).scoped(),
  auditService: asClass(AuditService).scoped(),
};

export default auditContext;