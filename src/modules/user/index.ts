import { CreateUserHandler } from '@/modules/user/app/command/CreateUser'
import { RouteHandler, type IHttpServer } from '@/modules/user/infra/controllers/routeHandler'
import { CreateUserController } from '@/modules/user/infra/controllers/createUser'
import { UserRepository } from '@/modules/user/infra/repo/repository'

export class UserModule {
  private httpServer: IHttpServer
  constructor(httpServer: IHttpServer) {
    this.httpServer = httpServer
  }
  bootstrap() {
    // Repo
    const userRepo = new UserRepository()

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
