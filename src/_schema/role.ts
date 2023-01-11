export const RoleTbl = "acc_role";

export const RoleRealCols = {
  id: `roleid`,
  name: `name`,
  description: `description`,
  enabled: `enabled`,
};

export const RoleCols = {
  id: `${RoleTbl}.roleid`,
  name: `${RoleTbl}.name`,
  description: `${RoleTbl}.description`,
  enabled: `${RoleTbl}.enabled`,
};