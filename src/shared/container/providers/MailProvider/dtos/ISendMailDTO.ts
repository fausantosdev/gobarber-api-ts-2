import IParceMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParceMailTemplateDTO'

interface IMailContact {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParceMailTemplateDTO
}
