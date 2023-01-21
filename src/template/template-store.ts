import { identity, Template } from "../types";
import { TemplateCols, TemplateRealCols, TemplateTbl } from "../_schema";

class TemplateStore {

  db : any;

  constructor({db}: any) {
    this.db = db;
  }

  get template() {
    return this.db(TemplateTbl);
  }

  async get(id: string) : Promise<Template> {
    return await this.template.select(TemplateCols).where(TemplateCols.id, id).first();
  }

  async getByTemplateTitle(title: string) : Promise<Template> {
    return await this.template.select(TemplateCols).where(TemplateCols.title, title).first();
  }

  async getByOtherTemplateTitle(template: Template) : Promise<Template> {
    return await this.template
      .select(TemplateCols)
      .where(TemplateCols.title, template.title)
      .whereNot(TemplateCols.id, '=', template.id)
      .first();
  }

  async find(params: any) : Promise<Template[]>{
    return await this.template.select(TemplateCols);
  }

  async create(template: Template, userid?: identity) : Promise<Template> {
    const [{ templateid }] = await this.template.insert({
      [TemplateRealCols.userid]: userid,
      [TemplateRealCols.title]: template.title,
      [TemplateRealCols.content]: template.content,
    }).returning(TemplateCols.id);
    return await this.get(templateid);
  }

  async update(template: Template) : Promise<Template> {
    await this.template.update({
      [TemplateRealCols.title]: template.title,
      [TemplateRealCols.content]: template.content,
    }).where(TemplateCols.id, template.id);
    return template;
  }

}

export default TemplateStore;