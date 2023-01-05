import authContext from "../auth/context";
import userContext from "../user/context";
import classroomContext from "../classroom/context";
import roleContext from "../role/context";

const appContext = {
  ...authContext,
  ...userContext,
  ...classroomContext,
  ...roleContext,
};

export default appContext;