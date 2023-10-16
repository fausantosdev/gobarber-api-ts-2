import { EntityRepository, Repository } from 'typeorm'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '../entities/Appointment'

@EntityRepository(Appointment)
class AppointmentsReporitory extends Repository<Appointment> implements IAppointmentRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = await this.findOne({
      where: { date },
    })

    return findAppointments
  }
}

export default AppointmentsReporitory
