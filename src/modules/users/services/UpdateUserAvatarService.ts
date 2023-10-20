import path from 'path'
import fs from 'fs'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFileName?: string
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      // Traz o status do arquivo (caso exista)
      const userAvatarFileExixts = await fs.promises.stat(userAvatarFilePath)

      // Caso o arquivo exista, delete ele.
      if (userAvatarFileExixts) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
