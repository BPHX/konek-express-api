import AuthService from "../auth/auth-service";
import RoleService from "../role/role-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { identity, Permission, Role, User, UserFilter } from "../types";
import UserStore from "./user-store";
import md5 from "md5";
import AuditStore, { EventTypes } from "../audit/audit-store";
import PermissionStore from "../permission/permission-store";

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
    const exists = await this.users.exists(user?.id as string);
    if (!exists)
      throw new NotFoundError("User not found");
    await this.users.update({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      gender: user.gender,
      email: user.email,
      dob: user.dob,
    });
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