export type identity = string | number;

export interface Config {
  id?: identity,
  value?: any,
  timestamp?: Date
};
export interface Permission {
  id?: identity,
  description?: string
};

export interface Role {
  id?: identity,
  name?: string,
  description?: string,
  timestamp?: Date,
  enabled?: boolean,
  permissions?: string[],
};

export interface User {
  id?: identity,
  username?: string,
  secret?: string,
  firstname?: String,
  email?: String,
  middlename?: String,
  lastname?: String,
  dob?: Date,
  gender?: String,
  timestamp?: Date,
  creator?: User | string | number,
  roles?: Role[],
  permissions?: Permission[],
  type?: string,
};

export interface Room {
  id?: identity,
  title?: string,
  description?: string,
  timestamp?: Date,
};

export interface SearchFilter {
  search?: string
}
export interface UserFilter extends SearchFilter {
  enabled?: boolean
}

export interface RoleFilter extends SearchFilter {
  enabled?: boolean
}

export interface AuditLog {
  id?: identity,
  type?: string,
  timestamp?: Date,
  context?: any,
  userid?: identity,
}