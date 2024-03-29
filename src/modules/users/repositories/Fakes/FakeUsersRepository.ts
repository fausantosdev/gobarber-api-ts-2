import { v4 } from 'uuid'

import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../../infra/typeorm/entities/User'

class FakeUsersRepository implements IUserRepository {
  private users: User[] = []

  public async create({name,email,password}: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: v4(), name, email, password })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
   const findIndex = this.users.findIndex( findUser => findUser.id === user.id )

   this.users[findIndex] = user

   return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user
  }
}

export default FakeUsersRepository
