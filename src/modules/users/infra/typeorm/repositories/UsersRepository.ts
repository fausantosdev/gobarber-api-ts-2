import { getRepository, Repository } from 'typeorm'

import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../entities/User'

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({name,email,password}: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({
      name,
      email,
      password
    })

    await this.ormRepository.save(appointment)

    return appointment
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where : { email }
    })

    return user
  }
}

export default UsersRepository
