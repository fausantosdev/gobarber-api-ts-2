import { v4 } from 'uuid'

import IUserTokensRepository from '../IUserTokensRepository'
import UserToken from '@modules/users/infra/typeorm/entities/UserToken'

class FakeUserTokensRepository implements IUserTokensRepository {
  private usersTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(findToken => findToken.token === token)

    return userToken
  }
}

export default FakeUserTokensRepository
