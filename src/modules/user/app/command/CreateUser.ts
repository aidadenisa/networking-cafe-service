import type { ICommand } from '@/app/command'
import type { Result } from '@/app/result'
import { User } from '@/modules/user/domain/user'

export type CreateUserInput = {
  email: string
}
export interface IUserRepository {
  createUser: (input: User) => Promise<Result<User>>
}

export class CreateUserHandler implements ICommand {
  private repository: IUserRepository
  constructor(repo: IUserRepository) {
    this.repository = repo
  }
  async execute(input: CreateUserInput): Promise<Result<User>> {
    console.log('executing create user command')

    const { data: user, error } = User.create(input)
    if (error) return { error }

    return await this.repository.createUser(user)
  }
}
