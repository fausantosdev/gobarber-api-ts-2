import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AuthService from './AuthService'
import CreateUserService from './CreateUserService'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authUser: AuthService

describe('AuthUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    authUser = new AuthService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
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
    await expect(authUser.execute({
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234abcd'
    })

    await expect(authUser.execute({
      email: 'johndoe@mail.com',
      password: 'abcd1234'
    })).rejects.toBeInstanceOf(AppError)
  })
})
