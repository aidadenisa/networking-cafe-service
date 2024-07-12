import express, { json } from 'express'
import type { Express, Router } from 'express'

export class HTTPServer {
  private server: Express
  private readonly port: number
  constructor(port: number) {
    this.port = port
    this.server = express()

    this.server.use(json())
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log('Listening on port ' + this.port)
        resolve()
      })
    })
  }

  registerNewRouter(path: string, router: Router) {
    this.server.use(path, router)
  }
}
