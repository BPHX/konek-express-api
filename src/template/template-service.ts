import AuthService from "../auth/auth-service";
import { BadRequestError, NotFoundError } from "../utils/middlewares/error-handler";
import { identity, Permission, Template} from "../types";
import TemplateStore from "./template-store";
import PermissionStore from "../permission/permission-store";

class TemplateService {

  store: TemplateStore;
  permissions: PermissionStore;

  constructor({templateStore, permissionStore}: any) {
    this.store = templateStore;
    this.permissions = permissionStore;
  }

  async get(id: string) : Promise<Template> {
    const result = await this.store.get(id);
    if (!result?.id) {
      throw new NotFoundError("Template not found");
    }
    return this._parse(result);
  }

  async find(filters: any) : Promise<Template[]> {
    const result = await this.store.find(filters);
    return result.map(this._parse);
  }

  async create(template: Template, userid?: identity ) {
    if (template.id) {
      throw new BadRequestError("New user should not contain user id");
    }
    if (!template.title)
      throw new BadRequestError("Room title is required");

    const exists = await this.store.getByTemplateTitle(template.title);
    if (exists)
      throw new BadRequestError(`Room with the title (${template.title}) already exists`);

    return await this.store.create(template, userid);
  }

  async update(template: Template, userid?: identity) {
    if (!template.id)
      throw new BadRequestError("Template id is required");
    if (!template.title)
      throw new BadRequestError("Template title is required");
    const exist = await this.store.getByOtherTemplateTitle(template);
    if (exist)
      throw new BadRequestError(`Template with the title (${template.title}) already exist`);
    return await this.store.update(template);
  }

  _parse({...template}: any) : Template {
    return {...template};
  }
}

export default TemplateService;