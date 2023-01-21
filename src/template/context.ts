import { asClass } from 'awilix';
import TemplateService from './template-service';
import TemplateStore from './template-store';

const templateContext = {
  templateStore: asClass(TemplateStore).scoped(),
  templateService: asClass(TemplateService).scoped(),
};

export default templateContext;