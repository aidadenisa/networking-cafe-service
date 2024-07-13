import { AppDataSource } from '@/infra/db/setup'
import { DataSource } from 'typeorm'

export class DatabaseClient {
  private dataSource: DataSource
  constructor() {
    this.dataSource = AppDataSource
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
