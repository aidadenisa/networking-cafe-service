import 'reflect-metadata'
import { DataSource, type LoggerOptions } from 'typeorm'

const entitiesPath = process.env.NODE_ENV === 'prod' ? '../**/*.entity.js' : './**/*.entity.ts'
const migrationsPath = process.env.NODE_ENV === 'prod' ? '../**/migrations/*.js' : './**/migrations/*.ts'
const enableLogging: LoggerOptions = process.env.NODE_ENV === 'dev' ? ['query', 'error', 'schema', 'warn', 'info', 'log'] : ['error']

export const InMemDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_IN_MEM_PORT || '') || 5433,
  username: process.env.POSTGRES_IN_MEM_USER,
  password: process.env.POSTGRES_IN_MEM_PASSWORD,
  database: process.env.POSTGRES_IN_MEM_DB,
  synchronize: false,
  logging: enableLogging,
  entities: [entitiesPath],
  subscribers: [],
  migrationsTableName: 'migrations',
  migrations: [migrationsPath],
})
