import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'

import IUserTokensRepository from '../repositories/IUserTokensRepository'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
      const userToken = await this.userTokensRepository.findByToken(token)

      if (!userToken) throw new AppError('User token does not exists', 401)

      const user = await this.usersRepository.findById(userToken.user_id)

      if (!user) throw new AppError('User does not exists', 401)

      user.password = await this.hashProvider.generateHash(password)

      await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
