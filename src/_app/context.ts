import authContext from "../auth/context";
import configContext from "../config/context";
import userContext from "../user/context";
import roomContext from "../room/context";
import templateContext from "../template/context";
import roleContext from "../role/context";
import permissionContext from "../permission/context";
import emailContext from "../email/context";
import auditContext from "../audit/context";

const appContext = {
  ...authContext,
  ...configContext,
  ...userContext,
  ...roomContext,
  ...templateContext,
  ...roleContext,
  ...permissionContext,
  ...auditContext,
  ...emailContext,
};

export default appContext;