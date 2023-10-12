import { Router, Request, Response } from 'express'

import AuthService  from '../../modules/users/services/AuthService'

const router = Router()

router.get('/', async (request, response) => {
   return response.json({ a: 'read'})
})

router.post('/', async (request, response) => {

  const authService = new AuthService()

  const { email, password } = request.body

  const { user, token } = await authService.execute({
    email,
    password
  })

  delete user.password

  return response.json({ user, token })
})

router.put('/', (request, response) => {
  return response.json({ a: 'update'})
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
