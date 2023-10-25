import { Router, Request, Response } from 'express'

import SessionsController from '../controllers/SessionsController'

const router = Router()

const sessionsController = new SessionsController()

router.get('/', async (request, response) => {
  return response.json({ a: 'read' })
})

router.post('/', sessionsController.create)

router.put('/', (request, response) => {
  return response.json({ a: 'update' })
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
