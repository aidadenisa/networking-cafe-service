import { HTTPServer } from './infra/http/server.js'
try {
  const httpServer = new HTTPServer(3200)

  await httpServer.listen()
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
