export const RolePermissionTbl = "acc_rolepermission";
export const RolePermissionCols = {
  role: `${RolePermissionTbl}.roleid`,
  permission: `${RolePermissionTbl}.permissionid`,
};

export const RolePermissionRealCols = {
  role: `roleid`,
  permission: `permissionid`,
};