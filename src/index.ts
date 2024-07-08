import 'reflect-metadata'

import { AppDataSource } from '@/infra/db/setup'
import { HTTPServer } from '@/infra/http/server'
import { UserModule } from '@/modules/user/index'
try {
  // Infra
  const httpServer = new HTTPServer(3200)

  // Modules
  const userModule = new UserModule(httpServer)
  userModule.bootstrap()

  // DB client initialization
  // TODO: create a wrapper for it.
  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')
  } catch (error) {
    console.error(error)
  }

  await httpServer.listen()
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
