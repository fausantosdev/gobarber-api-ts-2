import { container } from 'tsyringe'

import '@modules/users/providers'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsReporitory from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentRepository>('AppointmentsReporitory', AppointmentsReporitory)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
