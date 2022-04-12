import { Router, Request, Response } from 'express'
import { parse, parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const router = Router()

//const appointmentRepository = new AppointmentRepository()

router.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)

  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})

router.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    })

    return response.json(appointment)

  } catch (err: any) {
    return response.status(400).json({ error: err.message })
  }
})

router.put('/', (request, response) => {
  return response.json({ a: 'update'})
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
