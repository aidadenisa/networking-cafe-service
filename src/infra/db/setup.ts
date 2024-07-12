import 'reflect-metadata'
import { DataSource } from 'typeorm'

const entitiesPath = process.env.NODE_ENV === 'prod' ? './**/*.entity.js' : './**/*.entity.ts'
const migrationsPath = process.env.NODE_ENV === 'prod' ? './**/migrations/*.js' : './**/migrations/*.ts'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ncs',
  password: 'S3cret',
  database: 'ncs_db',
  synchronize: false,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'], // Enable detailed logging
  entities: [entitiesPath],
  subscribers: [],
  migrationsTableName: 'migrations',
  migrations: [migrationsPath],
})
