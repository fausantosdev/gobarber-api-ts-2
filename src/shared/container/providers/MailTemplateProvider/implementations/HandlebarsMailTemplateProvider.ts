import handlebars from 'handlebars'

import IParceMailTemplateDTO from '../dtos/IParceMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParceMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}

export default HandlebarsMailTemplateProvider
