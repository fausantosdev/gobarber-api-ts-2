import { Router } from 'express'

import AppointmentsController from '../controllers/AppointmentsController'

import insureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const router = Router()

const appointmentsController = new AppointmentsController()

router.use(insureAuthenticated)

/*router.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)

  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})*/

router.post('/', appointmentsController.create)

router.put('/', (request, response) => {
  return response.json({ a: 'update' })
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
