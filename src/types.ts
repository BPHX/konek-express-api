export interface Config {
  id?: string,
  value?: any,
  timestamp?: Date
};
export interface Permission {
  id?: string,
  description?: string
};

export interface Role {
  id?: string | number,
  name?: string,
  description?: string,
  timestamp?: Date,
  enabled?: boolean,
  permissions?: string[],
};

export interface User {
  id?: string | number,
  username?: string,
  secret?: string,
  firstname?: String,
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
  id?: string | number,
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

