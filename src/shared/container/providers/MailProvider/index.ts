import { container } from 'tsyringe'

import { IMailProvider } from './models/IMailProvider'
import EtherealMailProvide from './implementations/EtherealMailProvider'

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvide
)
