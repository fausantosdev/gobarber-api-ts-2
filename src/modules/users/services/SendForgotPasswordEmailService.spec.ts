import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeMailProvider  from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/Fakes/FakeUserTokensRepository'
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeEmailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {// beforeEach: antes de cada teste, beforeAll: antes de todos os testes
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
        fakeUsersRepository,
        fakeMailProvider,
        fakeUserTokensRepository
    )
  })

  it('should not be able to recover a non-existing user password', async () => {

    await expect(sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to recover the password using the email', async () => {
    //       ↓ guarda uma referência a função
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should generate a forgot password token', async () => {
    //       ↓ guarda uma referência a função
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
