import { Router, Request, Response } from 'express'
import { container } from 'tsyringe'

import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

const upload = multer(uploadConfig)

const router = Router()

router.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserService)

  try {
    const user = await createUser.execute({
      name,
      email,
      password,
    })

    // delete user.password

    return response.json(user)
  } catch (err: any) {
    return response.status(400).json({ error: err.message })
  }
})

router.put('/', (request, response) => {
  return response.json({ a: 'update' })
})

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename,
    })

    delete user.password

    return response.json(user)
  }
)

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
