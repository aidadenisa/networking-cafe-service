import { SQLClient } from '@/infra/db/client'
import { AppDataSource } from '@/infra/db/postgres/setup'
import { InMemDataSource } from '@/infra/db/postgresInMem/setup'

type DBConfig = {
  IN_MEMORY_DB_FLAG: boolean
}
export class DBFactory {
  static createSQLDB(config: DBConfig): SQLClient {
    let db: SQLClient
    if (config.IN_MEMORY_DB_FLAG) {
      console.log('Creating in memory DB connection')
      db = new SQLClient(InMemDataSource)
    } else {
      console.log('Creating persisted DB connection')
      db = new SQLClient(AppDataSource)
    }
    return db
  }
}
