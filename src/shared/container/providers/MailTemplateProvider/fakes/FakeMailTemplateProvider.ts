import IParceMailTemplateDTO from '../dtos/IParceMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParceMailTemplateDTO): Promise<string> {
    return 'Mail content'
  }
}

export default FakeMailTemplateProvider
