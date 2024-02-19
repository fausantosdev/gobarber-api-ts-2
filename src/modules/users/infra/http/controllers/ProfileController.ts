import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService
 from '@modules/users/services/ShowProfileService'

export default class ProfileController {
  public async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id: id })

    delete user?.password

    return response.json(user)
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const { name, email, oldPassword, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    try {
      const user = await updateProfile.execute({
        user_id: id,
        name,
        email,
        oldPassword,
        password,
      })

      delete user.password

      return response.json(user)
    } catch (err: any) {
      return response.status(400).json({ error: err.message })
    }
  }
}
