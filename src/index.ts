import 'reflect-metadata'
import 'dotenv/config'

import { HTTPServer } from '@/infra/http/server'
import { UserModule } from '@/modules/user/index'
import type { IDatabaseClient } from '@/infra/db/types'
import { DBFactory } from '@/infra/db/DBFactory'
try {
  // Infra
  const httpServer = new HTTPServer(3200)

  const db: IDatabaseClient = DBFactory.createDB()
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
