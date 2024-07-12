import type { CreateUserInput } from '@/modules/user/app/command/CreateUser'
import { User } from '@/modules/user/domain/user'
import { UserEntity } from '@/modules/user/infra/repo/user.entity'

export class UserRepository {
  async createUser(input: User) {
    const newUser = new UserEntity()
    newUser.id = input.id
    newUser.email = input.email.toString()
    try {
      await newUser.save()
    } catch (error: any) {
      throw new Error(`Error inserting a new user in the DB: ${error.message}`)
    }

    return new User({
      id: newUser.id,
      email: newUser.email,
    })
  }
}
