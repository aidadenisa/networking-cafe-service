import { DataSource } from 'typeorm'
import type { IDatabaseClient } from '@/infra/db/types'

export class SQLClient implements IDatabaseClient {
  dataSource: DataSource
  constructor(ds: DataSource) {
    this.dataSource = ds
  }
  async connect(): Promise<void> {
    await this.dataSource.initialize()
    console.log('Data Source has been initialized!')

    await this.dataSource.runMigrations()
    console.log('Migrations ran successfully!')
  }
  async disconnect(): Promise<void> {
    await this.dataSource.destroy()
    console.log('Closing DB connection.')
  }
  async query(sqlQuery: string, params?: any[]): Promise<any> {
    return this.dataSource.query(sqlQuery, params)
  }
}
