import AuthService from "../auth/auth-service";
import RoleService from "../role/role-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { identity, Role, User, UserFilter } from "../types";
import UserStore from "./user-store";
import md5 from "md5";
import AuditStore, { EventTypes } from "../audit/audit-store";
import PermissionStore from "../permission/permission-store";
import { intersection, isEqual, pull, pullAll } from "lodash";
import getObjectDiff from "../utils/diff";

class UserService {

  users: UserStore;
  roles: RoleService;
  authService: AuthService;
  audit: AuditStore;
  permissions: PermissionStore;

  constructor({ userStore, roleService, authService, auditStore, permissionStore }: any) {
    this.users = userStore;
    this.roles = roleService;
    this.authService = authService;
    this.audit = auditStore;
    this.permissions = permissionStore;
  }

  async get(id: identity) {
    const user = await this.users.get(id);
    if (!user)
      throw new NotFoundError("User not found");
    return this._parse(user);
  }

  async find(filters: UserFilter) {
    const result = await this.users.find(filters);
    return (result).map(this._parse);
  }

  async create(user: User) {
    if (!user.username)
      throw new BadRequestError("Username is required");
    const exists = await this.users.existsByUsername(user.username);
    if (exists)
      throw new BadRequestError("Username is already taken");
    const password = this.authService.generatePassword();
    const secret = this.authService.encrypt(md5(password));
    const userid = await this.users.create({ ...user, secret });
    await this.audit.logEvent(EventTypes.USER_CREATED, user);
    return await this.get(userid);
  }

  async update(user: User) {
    const existingUser = await this.get(user?.id as string);
    if (!existingUser)
      throw new NotFoundError("User not found");
    
    const { roles: exRoles, ...xUser } = existingUser;
    const { roles: nRoles, ...nUser } = user;
    const xRoles = (exRoles as Role[]).map(x=>x.id);

    const toAdd = pullAll([...nRoles as string[]] , [...xRoles as string[]]);
    const toRemove = pullAll([...xRoles as string[]] , [...nRoles as string[]]);
    
    if (isEqual(xUser, nUser) && toAdd.length === 0 && toRemove.length === 0)
      return existingUser;

    if (toAdd.length > 0 || toRemove.length > 0) {
      const vRoles =  (await this.roles.find()).map(x=>x.id);
      const invalid = pullAll([...nRoles as string[]], vRoles);
      if (invalid.length > 0)
        throw new BadRequestError("User contains invalid roleid");
    }

    const diff = getObjectDiff(xUser, nUser);

    if (Object.keys(diff.from).length > 0)
      await this.users.update({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        middlename: user.middlename,
        gender: user.gender,
        email: user.email,
        dob: user.dob,
      });

    if (toAdd.length > 0 || toRemove.length > 0) {
      diff.from.roles = xRoles;
      diff.to.roles = nRoles;
      this.users.removeRoles(user.id as identity, toRemove);
      this.users.addRoles(user.id as identity, toAdd);
    }

    await this.audit.logEvent(EventTypes.USER_UPDATED, diff);
    
    return await this.get(user?.id as string);
  }

  async resetPassword(id: identity) {
    if (!id)
      throw new BadRequestError("id is required");
    await this.get(id);

    const password = this.authService.generatePassword();
    const secret = this.authService.encrypt(md5(password));
    await this.users.update({
      id, secret: secret,
    });
    await this.audit.logEvent(EventTypes.USER_UPDATED, { type: "Change Password" });
    return { tempKey: password };
  }

  async delete(id: number) {
    return await this.users.delete(id);
  }

  async getPermissions(id: identity): Promise<identity[]> {
    const user = await this.users.get(id);

    if (!user)
      throw new NotFoundError("User not found");
    if (user.type === "SUP")
      return (await this.permissions.find()).map((p)=>p?.id as identity);
    return await this.users.getPermissions(id);
  }

  async getRoles(id: string): Promise<Role[]> {
    const exists = await this.users.exists(id);
    if (!exists)
      throw new NotFoundError("User not found");
    return await this.users.getRoles(id);
  }

  _parse({ secret, roles, ...user }: any): User {
    const rls = roles?.filter((r: any) => r.id) || [];
    return { ...user, roles: rls };
  }
}

export default UserService;