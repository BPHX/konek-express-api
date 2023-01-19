import UserStore from "../user/user-store";
import { BadRequestError, UnauthorizedError } from "../utils/middlewares/error-handler";
import jwt from "jsonwebtoken";
import md5 from "md5";
import { identity } from "../types";

class AuthService {

  userStore: UserStore;
  auth: any;

  constructor({userStore, auth}: any) {
    this.userStore = userStore;
    this.auth = auth;
  }

  async signIn(username: string, secret: string) {
    const user = await this.userStore.getByUsername(username);
    if (!user?.id || user.secret !== this.encrypt(secret))
      throw new UnauthorizedError("Invalid username / password");

    const info = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
  
    const token = jwt.sign(info, this.auth?.key, { expiresIn: this.auth?.expiry });
  
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      type: this?.auth.type,
      token,
    };
  }
  
  verify(tokenString: string) {
    const [ type, token ] = tokenString.split(" ");
    if (!token || type !== this?.auth?.type)
      throw new UnauthorizedError("Invalid token");
    return jwt.verify(token, this.auth?.key);
  }

  async isAuthorized(id?: identity, ...acls: string[]) : Promise<boolean> {

    if (!id) return false;
  
    const user = await this.userStore.get(id);
    // Block Unknown user
    if (!user) return false;

    // Allow if no acls specified
    if (!acls?.length) return true;

    // Allow Super admin and Service accounts
    if (['SUP','SVC'].indexOf(user?.type)> -1)
      return true;
  
    const permissions = await this.userStore.getPermissions(id);

    // Block if no permissions to avoid the loop
    if (!permissions?.length)
      return false;

    // Check if all permissions exists
    for (let acl of acls) {
      if (permissions.indexOf(acl) === -1)
        return false;
    }

    return true;
  }

  encrypt(key: string) : string {
    return Buffer.from(md5(`${key}-${this.auth?.salt}`)).toString('base64');
  }

  generatePassword() : string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  
  async changePassword(id: identity, oldPass: string, newPass: string) {
    if (!id)
      throw new BadRequestError("id is required");
    if (!oldPass)
      throw new BadRequestError("Old Password is Required");
    if (!newPass)
      throw new BadRequestError("Invalid Password");
    const user = await this.userStore.get(id);
    if (user.secret !== this.encrypt(oldPass))
      throw new UnauthorizedError("Old password does not matched");
    const secret = this.encrypt(newPass);
    await this.userStore.update({
      id, secret: secret,
    });
  }
}

export default AuthService;
