import { Router, Request, Response } from 'express'
import { parse, parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import insureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const router = Router()

router.use(insureAuthenticated)

router.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)

  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  })

  return response.json(appointment)
})

router.put('/', (request, response) => {
  return response.json({ a: 'update' })
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
