import { CreateUserHandler } from '@/modules/user/app/command/CreateUser'
import { RouteHandler, type IHttpServer } from '@/modules/user/infra/controllers/routeHandler'
import { CreateUserController } from '@/modules/user/infra/controllers/createUser'
import { UserRepository, type IUserRepository } from '@/modules/user/infra/repo/repository'
import type { SQLClient } from '@/infra/db/client'

export class UserModule {
  private httpServer: IHttpServer
  private dbClient: SQLClient
  constructor(httpServer: IHttpServer, dbClient: SQLClient) {
    this.httpServer = httpServer
    this.dbClient = dbClient
  }
  bootstrap() {
    // Repo
    const userRepo: IUserRepository = new UserRepository(this.dbClient)

    // Commands
    const createUserCommand = new CreateUserHandler(userRepo)

    // Controllers
    const createUserController = new CreateUserController(createUserCommand)

    const controllers = {
      createUser: createUserController,
    }

    // Router
    const routeHandler = new RouteHandler(this.httpServer, controllers)
    routeHandler.registerRoutes()
  }
}
