import { v4 } from 'uuid'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { isEqual } from 'date-fns'

import Appointment from '../../infra/typeorm/entities/Appointment'

class FakeAppointmentsReporitory implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: v4(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointment => isEqual(appointment.date, date))

    return appointment
  }
}

export default FakeAppointmentsReporitory
