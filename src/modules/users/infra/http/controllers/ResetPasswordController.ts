import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'

export default class ResetPasswordController {
  async create (request: Request, response: Response): Promise<Response> {
    const resetPassword = container.resolve(ResetPasswordService)

    const { token, password } = request.body

    await resetPassword.execute({
      token,
      password
    })

    return response.status(204).json()
  }
}
