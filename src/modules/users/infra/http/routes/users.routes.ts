import { Router } from 'express'

import multer from 'multer'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const upload = multer(uploadConfig)

const router = Router()

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

router.post('/', usersController.create)

router.put('/', (request, response) => {
  return response.json({ a: 'update' })
})

router.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

router.delete('/', (request, response) => {
  return response.json({ a: 'delete' })
})

export default router
