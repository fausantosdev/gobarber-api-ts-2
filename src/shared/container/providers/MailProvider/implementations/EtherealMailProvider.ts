import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import { IMailProvider } from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      })

      this.client = transporter
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    // Message object
    let message = {
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject: 'Recuperação de Senha',
      //text: 'Teste body',
      html: await this.mailTemplateProvider.parse(templateData)
    }

    this.client.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message)
            return process.exit(1)
        }

        console.log('Message sent: %s', info.messageId)
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
  }
}
