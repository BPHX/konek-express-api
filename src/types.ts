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
  assignable?: boolean,
  enabled?: boolean,
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