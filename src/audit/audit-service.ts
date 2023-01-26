import { AuditFilter } from "../types";
import AuditStore from "./audit-store";

class AuditService {

  store: AuditStore;

  constructor({ auditStore, auth }: any) {
    this.store = auditStore;
  }

  async find(filter?: AuditFilter) {
    return this.store.find(filter);
  }
}

export default AuditService;
