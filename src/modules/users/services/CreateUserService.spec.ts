import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import CreateUserService from './CreateUserService'

import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
        fakeUsersRepository,
        fakeHashProvider
      )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
        fakeUsersRepository,
        fakeHashProvider
      )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    expect(
        createUser.execute({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '1234abcd'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
