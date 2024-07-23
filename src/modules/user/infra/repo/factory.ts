import { RedisClient } from '@/infra/redis/client'
import { RedisRepository } from '@/modules/user/infra/repo/redisRepo'
import type { IUserRepository } from '@/modules/user/infra/repo/repository'
import { SQLRepository } from '@/modules/user/infra/repo/sqlRepo'

export class UserRepoFactory {
  static createRepo(dbClient: any): IUserRepository {
    let userRepo: IUserRepository
    if (process.env.IN_MEMORY_DB_FLAG === 'true' && dbClient instanceof RedisClient) {
      userRepo = new RedisRepository(dbClient)
    } else {
      userRepo = new SQLRepository(dbClient)
    }

    return userRepo
  }
}
