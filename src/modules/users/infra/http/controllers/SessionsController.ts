import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthService from '@modules/users/services/AuthService'

export default class SessionsController {
  async create (request: Request, response: Response): Promise<Response> {
    const authService = container.resolve(AuthService)

    const { email, password } = request.body

    const { user, token } = await authService.execute({
      email,
      password,
    })

    delete user.password

    return response.json({ user, token })
  }
}
