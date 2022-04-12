import { Router, Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import { getRepository } from 'typeorm'

import User from '../models/User'

const router = Router()

router.get('/', async (request, response) => {

  const usersRepository = getRepository(User)

  try {
    const users = await usersRepository.find({})

    return response.json(users)
  } catch (err: any) {
    return response.status(400).json({ error: err.message })
  }
})

router.post('/', async (request, response) => {
  const {name, email, password} = request.body

  const createUser = new CreateUserService()

  try {
    const user = await createUser.execute({
      name, email, password
    })

    //delete user.password

    return response.json(user)

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
