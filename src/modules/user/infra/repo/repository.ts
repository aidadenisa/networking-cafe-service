import type { Result } from '@/app/result'
import { User } from '@/modules/user/domain/user'
import type { UUID } from 'crypto'

export interface IUserRepository {
  createUser(input: User): Promise<Result<User>>
  getUserById(id: UUID): Promise<Result<User | null>>
}
