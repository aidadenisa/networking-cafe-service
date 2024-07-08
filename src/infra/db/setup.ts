import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ncs',
  password: 'S3cret',
  database: 'ncs_db',
  synchronize: true,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'], // Enable detailed logging
  entities: ['./**/*.entity.ts'],
  subscribers: [],
  migrationsTableName: 'migrations',
  migrations: ['./migrations/*{.js,.ts}'],
})
