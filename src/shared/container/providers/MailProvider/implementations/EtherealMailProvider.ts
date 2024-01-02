import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '../models/IMailProvider'

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor () {
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

  public async sendMail(to: string, body: string): Promise<void> {
    // Message object
    let message = {
      from: 'Equipe GoBarber <fausantosdev@hotmail.com>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
      //html: '<p><b>Hello</b> to myself!</p>'
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
