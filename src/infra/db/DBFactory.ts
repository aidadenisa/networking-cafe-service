import { SQLClient } from '@/infra/db/postgres/client'
import { AppDataSource } from '@/infra/db/postgres/setup'
import type { IDatabaseClient } from '@/infra/db/types'
import { RedisClient } from '@/infra/db/redis/client'

type DBConfig = {
  IN_MEMORY_DB_FLAG: boolean
}
export class DBFactory {
  static createDB(config: DBConfig): IDatabaseClient {
    let db: IDatabaseClient
    if (config.IN_MEMORY_DB_FLAG) {
      db = new RedisClient()
    } else {
      db = new SQLClient(AppDataSource)
    }
    return db
  }
}
