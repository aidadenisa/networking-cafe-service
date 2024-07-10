import type { CreateUserInput } from '@/modules/user/app/command/CreateUser'
import { User } from '@/modules/user/domain/user'
import { UserEntity } from '@/modules/user/infra/repo/user.entity'

export class UserRepository {
  createUser(input: CreateUserInput) {
    const newUser = new UserEntity()
    newUser.firstName = input.firstName
    newUser.lastName = input.lastName
    try {
      newUser.save()
    } catch (error: any) {
      throw new Error(`Error inserting a new user in the DB: ${error.message}`)
    }

    return new User({
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      birthday: input.birthday,
    })
  }
}
