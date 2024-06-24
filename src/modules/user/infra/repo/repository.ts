import type { CreateUserInput } from '@/modules/user/app/command/CreateUser'
import { User } from '@/modules/user/domain/user'

export class UserRepository {
  insertUser(input: CreateUserInput) {
    // TODO: insert user logic

    return new User({
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      birthday: input.birthday,
    })
  }
}
