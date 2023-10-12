import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import AppError from '../../../shared/errors/AppError'

import User from '../entities/User'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
 async execute({name, email, password}: Request): Promise<User> {
   // Repository não é necessário se não terá nenhum método personalizado, ou seja, que não seja nativo do typeorm.
    const usersRepository = getRepository(User)

    const userExists = await usersRepository.findOne({
      where: { email }
    })

    if(userExists){
      throw new AppError('Email address already user',400)
    }

    const hashedPassword = await hash(password, 8)

    // Cria a intância, não salva.
    const user = usersRepository.create({
      name, email, password: hashedPassword
    })

    await usersRepository.save(user)

    //delete user.password

    return user
  }
}

export default CreateUserService
