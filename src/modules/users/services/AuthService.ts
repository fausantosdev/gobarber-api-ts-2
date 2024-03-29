import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

// Regras de negócio
// S - Single Responsability Principle
// D - Dependency Inversion Principle

@injectable()
class AuthService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(
        'Authentication failed: incorrect credentials.[1]',
        200
      )
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

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
