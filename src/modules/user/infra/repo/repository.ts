import { InternalError } from '@/app/error'
import type { Result } from '@/app/result'
import { User } from '@/modules/user/domain/user'
import { UserEntity } from '@/modules/user/infra/repo/user.entity'

export class UserRepository {
  async createUser(input: User): Promise<Result<User>> {
    const newUser = new UserEntity()
    newUser.id = input.id
    newUser.email = input.email.toString()
    try {
      await newUser.save()
    } catch (error: any) {
      return { error: new InternalError(`error inserting new user in the DB: ${error.message}`) }
    }

    return User.create({
      id: newUser.id,
      email: newUser.email,
    })
  }
}
