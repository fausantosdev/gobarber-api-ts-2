import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/Fakes/FakeUserTokensRepository'

import ResetPasswordService from './ResetPasswordService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {// beforeEach: antes de cada teste, beforeAll: antes de todos os testes
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    resetPasswordService = new ResetPasswordService(
        fakeUsersRepository,
        fakeUserTokensRepository
    )
  })

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({
      token,
      password: '654321'
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(updatedUser?.password).toBe('654321')
  })
})
