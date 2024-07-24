import { RedisClient } from '@/infra/db/redis/client'
import { RedisRepository } from '@/modules/user/infra/repo/redisRepo'
import type { IUserRepository } from '@/modules/user/infra/repo/repository'
import { SQLRepository } from '@/modules/user/infra/repo/sqlRepo'

export class UserRepoFactory {
  static createRepo(dbClient: any): IUserRepository {
    let userRepo: IUserRepository
    if (dbClient instanceof RedisClient) {
      userRepo = new RedisRepository(dbClient)
    } else {
      userRepo = new SQLRepository(dbClient)
    }

    return userRepo
  }
}
