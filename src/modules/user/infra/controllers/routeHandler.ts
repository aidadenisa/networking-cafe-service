import { ResponseTimeDecorator } from '@/infra/http/decorators'
import type { IController } from '@/infra/http/types'
import express from 'express'
import type { Request, Response, Router } from 'express'

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
    this.controllers = {
      createUser: new ResponseTimeDecorator(controllers.createUser),
    }
  }

  registerRoutes() {
    const router = express.Router()

    router.post('/', (req: Request, res: Response) => {
      this.controllers.createUser.run(req, res)
    })

    this.httpServer.registerNewRouter(BASE_PATH, router)
  }
}
