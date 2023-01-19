export const AuditTble = "sys_audit";
export const AuditCols = {
  id: `${AuditTble}.eventid`,
  type: `${AuditTble}.event_type`,
  userid: `${AuditTble}.userid`,
  context: `${AuditTble}.context`,
  timestamp: `${AuditTble}.tiemstmp`,
};

export const AuditRealCols = {
  id: `eventid`,
  type: `event_type`,
  userid: `userid`,
  context: `context`,
  timestamp: `tiemstmp`,
};