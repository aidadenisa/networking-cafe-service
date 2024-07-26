import 'reflect-metadata'
import { DataSource, type LoggerOptions } from 'typeorm'

const entitiesPath = process.env.NODE_ENV === 'prod' ? './**/*.entity.js' : './**/*.entity.ts'
const migrationsPath = process.env.NODE_ENV === 'prod' ? './**/migrations/*.js' : './**/migrations/*.ts'
const enableLogging: LoggerOptions = process.env.NODE_ENV === 'dev' ? ['query', 'error', 'schema', 'warn', 'info', 'log'] : ['error']

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '') || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: enableLogging,
  entities: [entitiesPath],
  subscribers: [],
  migrationsTableName: 'migrations',
  migrations: [migrationsPath],
})
