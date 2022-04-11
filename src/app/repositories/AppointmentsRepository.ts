import {EntityRepository, Repository} from 'typeorm'

import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentsReporitory extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointments = await this.findOne({
      where: { date }
    })

    return findAppointments || null
  }
}

export default AppointmentsReporitory
