import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

export default class UsersController {
  async create (request: Request, response: Response): Promise<Response> {
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
  }
}
