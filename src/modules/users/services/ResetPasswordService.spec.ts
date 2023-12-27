import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/Fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import ResetPasswordService from './ResetPasswordService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService
let fakeHashProvider: FakeHashProvider

describe('ResetPasswordService', () => {
  beforeEach(() => {// beforeEach: antes de cada teste, beforeAll: antes de todos os testes
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider

    resetPasswordService = new ResetPasswordService(
        fakeUsersRepository,
        fakeUserTokensRepository,
        fakeHashProvider
    )
  })

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      token,
      password: '654321'
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('654321')
    expect(updatedUser?.password).toBe('654321')
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
