import { CreateUserHandler } from '@/modules/user/app/command/CreateUser'
import { RouteHandler, type IHttpServer } from '@/modules/user/infra/controllers/routeHandler'
import { CreateUserController } from '@/modules/user/infra/controllers/createUser'
import type { IUserRepository } from '@/modules/user/infra/repo/repository'
import type { IDatabaseClient } from '@/infra/db/types'
import { UserRepoFactory } from '@/modules/user/infra/repo/factory'

export class UserModule {
  private httpServer: IHttpServer
  private dbClient: IDatabaseClient
  constructor(httpServer: IHttpServer, dbClient: IDatabaseClient) {
    this.httpServer = httpServer
    this.dbClient = dbClient
  }
  bootstrap() {
    // Repo
    const userRepo: IUserRepository = UserRepoFactory.createRepo(this.dbClient)

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
