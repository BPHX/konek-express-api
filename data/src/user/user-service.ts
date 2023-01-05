import AuthService from "../auth/auth-service";
import RoleService from "../role/role-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import UserStore, { User } from "./user-store";

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
    const result = await this.users.get(id);
    if (!result?.id) {
      throw new NotFoundError("User not found");
    }
    return this._parse(result);
  }

  async find(filters: any) {
    const result = await this.users.find(filters);
    return (result).map(this._parse);
  }

  async create(user: User) {
    if (user.id)
      throw new BadRequestError("New user should not contain user id");

    const password = this.authService.generatePassword();
    const secret = this.authService.encrypt(password);
    const userid = await this.users.create({...user, secret});
    return this.get(userid);
  }

  async update(user: User) {
    return await this.users.update(user);
  }

  async delete(id: number) {
    return await this.users.delete(id);
  }

  _parse({secret, roles, ...user}: any) : User {
    const rls = roles.filter((r:any)=>r.id);
    return { ...user, roles: rls };
  }
}

export default UserService;