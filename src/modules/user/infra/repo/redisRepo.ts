import { InternalError } from '@/app/error'
import type { Result } from '@/app/result'
import { User } from '@/modules/user/domain/user'
import type { IUserRepository } from '@/modules/user/infra/repo/repository'
import type { UUID } from 'crypto'

interface IRedisClient {
  setValue(key: string, value: string): Promise<void>
  getValue(key: string): Promise<string | null>
}

export class RedisRepository implements IUserRepository {
  private client: IRedisClient
  constructor(redisClient: IRedisClient) {
    this.client = redisClient
  }

  async createUser(input: User): Promise<Result<User>> {
    // Function to set a key-value pair in Redis

    try {
      await this.client.setValue(input.id, JSON.stringify(input))
    } catch (error: any) {
      return { error: new InternalError(`error inserting new user in the redis DB: ${error.message}`) }
    }

    return { data: input }
  }

  async getUserById(id: UUID): Promise<Result<User | null>> {
    try {
      const value = await this.client.getValue(id)
      if (!value) {
        return { data: null }
      }

      const result: any = JSON.parse(value)
      return User.create({
        id: result.id,
        email: result.email,
      })
    } catch (error: any) {
      return { error: new InternalError(`error inserting new user in the redis DB: ${error.message}`) }
    }
  }
}
