import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'
const upload = multer(uploadConfig)

import User from '@modules/users/infra/typeorm/entities/User'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

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

router.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService()

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFileName: request.file?.filename
  })

  delete user.password
  
  return response.json(user)
})

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
