import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository'
import FakeMailProvider  from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()

    //       ↓ guarda uma referência a função
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
        fakeUsersRepository,
        fakeMailProvider
    )

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })
})
