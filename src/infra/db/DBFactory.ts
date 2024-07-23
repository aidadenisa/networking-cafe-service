import { SQLClient } from '@/infra/db/postgres/client'
import { AppDataSource } from '@/infra/db/postgres/setup'
import type { IDatabaseClient } from '@/infra/db/types'
import { RedisClient } from '@/infra/redis/client'

export class DBFactory {
  static createDB(): IDatabaseClient {
    let db: IDatabaseClient
    if (process.env.IN_MEMORY_DB_FLAG === 'true') {
      db = new RedisClient()
    } else {
      db = new SQLClient(AppDataSource)
    }
    return db
  }
}
