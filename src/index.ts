import 'reflect-metadata'

import { HTTPServer } from '@/infra/http/server'
import { UserModule } from '@/modules/user/index'
import { DatabaseClient } from '@/infra/db/client'
try {
  // Infra
  const httpServer = new HTTPServer(3200)

  const db = new DatabaseClient()
  await db.connect()

  // Modules
  const userModule = new UserModule(httpServer)
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
