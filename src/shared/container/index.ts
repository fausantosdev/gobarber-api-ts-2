import { container } from 'tsyringe'

import '@modules/users/providers'

import './providers/StorageProvider'
import './providers/MailProvider'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsReporitory from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsReporitory',
  AppointmentsReporitory
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
