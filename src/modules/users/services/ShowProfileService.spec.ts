import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'
import AppError from '@shared/errors/AppError'


let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    const profile = await showProfileService.execute({
      user_id: user.id
    })

    expect(profile?.name).toBe('John Doe')
    expect(profile?.email).toBe('johndoe@example.com')
  })

  it('should not be able show the profile from non-existing user', async () => {

    expect(showProfileService.execute({
      user_id: 'non-existing-user-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
