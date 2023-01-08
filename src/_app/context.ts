import authContext from "../auth/context";
import configContext from "../config/context";
import userContext from "../user/context";
import roomContext from "../room/context";
import roleContext from "../role/context";
import permissionContext from "../permission/context";

const appContext = {
  ...authContext,
  ...configContext,
  ...userContext,
  ...roomContext,
  ...roleContext,
  ...permissionContext,
};

export default appContext;