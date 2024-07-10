import type { ICommand } from '@/app/command'
import type { User } from '@/modules/user/domain/user'
import { randomUUID, type UUID } from 'crypto'

export type CreateUserInput = {
  id: UUID
  firstName: string
  lastName: string
  birthday: Date
}
interface IUserRepository {
  createUser: (input: CreateUserInput) => User
}

export class CreateUserHandler implements ICommand {
  private repository: IUserRepository
  constructor(repo: IUserRepository) {
    this.repository = repo
  }
  execute() {
    const input: CreateUserInput = {
      id: randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      birthday: new Date(1990, 0, 1),
    }
    const user = this.repository.createUser(input)
    console.log('executing create user handler')
    return user
  }
}
