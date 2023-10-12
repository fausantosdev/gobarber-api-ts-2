import {startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm'

import Appointment from '../entities/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

import AppError from '../../../shared/errors/AppError'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsReporitory = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsReporitory.findByDate(
      appointmentDate
    )

    if(findAppointmentInSameDate){
      throw new AppError('This appointment is already booked', 400)
    }

    const appointment = appointmentsReporitory.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsReporitory.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService