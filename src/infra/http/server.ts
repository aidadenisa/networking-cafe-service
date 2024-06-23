import express from 'express'
import type { Express } from 'express'

export class HTTPServer {
  private server: Express
  private readonly port: number
  constructor(port: number) {
    this.port = port
    this.server = express()
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log('Listening on port ' + this.port)
        resolve()
      })
    })
  }
}
