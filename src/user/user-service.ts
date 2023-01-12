import AuthService from "../auth/auth-service";
import RoleService from "../role/role-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { Permission, Role, User, UserFilter } from "../types";
import UserStore from "./user-store";
import md5 from "md5";

class UserService {

  users: UserStore;
  roles: RoleService;
  authService: AuthService;


  constructor({userStore, roleService, authService}: any) {
    this.users = userStore;
    this.roles = roleService;
    this.authService = authService;
  }

  async get(id: string) {
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
    if (user.id)
      throw new BadRequestError("New user should not contain user id");

    const password = this.authService.generatePassword();
    console.log(password);
    const secret = this.authService.encrypt(md5(password));
    const userid = await this.users.create({...user, secret});
    return await this.get(userid);
  }

  async update(user: User) {
    const exists = await this.users.exists(user?.id as string);
    if (!exists)
      throw new NotFoundError("User not found");
    return await this.users.update(user);
  }

  async delete(id: number) {
    return await this.users.delete(id);
  }

  async getPermissions(id: string) : Promise<Permission[]> {
    const exists = await this.users.exists(id);
    if (!exists)
      throw new NotFoundError("User not found");
    return await this.users.getPermissions(id);
  }

  async getRoles(id: string) : Promise<Role[]> {
    const exists = await this.users.exists(id);
    if (!exists)
      throw new NotFoundError("User not found");
    return await this.users.getRoles(id);
  }

  _parse({secret, roles, ...user}: any) : User {
    const rls = roles?.filter((r:any)=> r.id) || [];
    return { ...user, roles: rls };
  }
}

export default UserService;