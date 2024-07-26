import 'reflect-metadata'
import 'dotenv/config'

import { HTTPServer } from '@/infra/http/server'
import { UserModule } from '@/modules/user/index'
import { DBFactory } from '@/infra/db/DBFactory'
import type { SQLClient } from '@/infra/db/client'
try {
  // Config
  const config = { IN_MEMORY_DB_FLAG: process.env.IN_MEMORY_DB_FLAG === 'true' }

  // Infra
  const httpServer = new HTTPServer(3200)

  const db: SQLClient = DBFactory.createSQLDB(config)
  await db.connect()

  // Modules
  const userModule = new UserModule(httpServer, db)
  userModule.bootstrap()

  // Start http server
  await httpServer.listen()
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
