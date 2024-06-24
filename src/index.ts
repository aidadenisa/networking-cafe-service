import { HTTPServer } from '@/infra/http/server'
import { UserModule } from '@/modules/user/index'
try {
  // Infra
  const httpServer = new HTTPServer(3200)

  // Modules
  const userModule = new UserModule(httpServer)
  userModule.bootstrap()

  await httpServer.listen()
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
