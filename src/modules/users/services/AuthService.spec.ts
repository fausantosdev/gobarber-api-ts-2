import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AuthService from './AuthService'
import CreateUserService from './CreateUserService'

import AppError from '@shared/errors/AppError'

describe('AuthUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
        fakeUsersRepository,
        fakeHashProvider
      )

    const authUser = new AuthService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    const response = await authUser.execute({
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authUser = new AuthService(fakeUsersRepository, fakeHashProvider)

    expect(authUser.execute({
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
        fakeUsersRepository,
        fakeHashProvider
      )

    const authUser = new AuthService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    expect(authUser.execute({
      email: 'johndoe@mail.com',
      password: 'abcd1234'
    })).rejects.toBeInstanceOf(AppError)
  })
})
