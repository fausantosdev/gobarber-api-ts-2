import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

// Regras de negócio
class AuthService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    // console.log(user)

    if (!user) {
      throw new AppError(
        'Authentication failed: incorrect credentials.[1]',
        200
      )
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError(
        'Authentication failed: incorrect credentials.[2]',
        200
      )
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthService
