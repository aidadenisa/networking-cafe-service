import type { ICommand } from '@/app/command'
import { Email } from '@/modules/user/domain/email'
import { User } from '@/modules/user/domain/user'
import { randomUUID, type UUID } from 'crypto'

export type CreateUserInput = {
  email: string
}
interface IUserRepository {
  createUser: (input: User) => Promise<User>
}

export class CreateUserHandler implements ICommand {
  private repository: IUserRepository
  constructor(repo: IUserRepository) {
    this.repository = repo
  }
  async execute(input: CreateUserInput) {
    try {
      const user = new User(input)
      const result = await this.repository.createUser(user)
      console.log('executing create user handler')
      return result
    } catch (error: any) {
      throw new Error(`Could not create user: ${error.message}`)
    }
  }
}
