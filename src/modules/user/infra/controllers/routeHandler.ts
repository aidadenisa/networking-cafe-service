import express from 'express'
import type { Request, Response, Router } from 'express'

export interface IController {
  run: (req: Request, res: Response) => any | void
}

export type Controllers = {
  createUser: IController
}

export interface IHttpServer {
  registerNewRouter: (basePath: string, router: Router) => void
}

const BASE_PATH = '/user'

export class RouteHandler {
  private httpServer: IHttpServer
  private controllers: Controllers
  constructor(httpServer: IHttpServer, controllers: Controllers) {
    this.httpServer = httpServer
    this.controllers = controllers
  }

  registerRoutes() {
    const router = express.Router()

    router.post('/', (req: Request, res: Response) => {
      this.controllers.createUser.run(req, res)
    })

    this.httpServer.registerNewRouter(BASE_PATH, router)
  }
}
