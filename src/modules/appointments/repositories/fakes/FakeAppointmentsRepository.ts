import { uuid } from 'uuidv4'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/Appointment'

class FakeAppointmentsReporitory implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointment => {
      appointment.date === date
    })

    return appointment
  }
}

export default FakeAppointmentsReporitory
