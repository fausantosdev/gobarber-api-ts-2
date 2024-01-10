import IParceMailTemplateDTO from '../dtos/IParceMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParceMailTemplateDTO): Promise<string> {
    return template
  }
}

export default FakeMailTemplateProvider
