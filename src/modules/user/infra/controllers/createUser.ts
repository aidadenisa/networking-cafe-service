import type { IController } from '@/modules/user/infra/controllers/routeHandler'
import type { Request, Response } from 'express'

interface ICreateUserCommand {
  execute: () => void
}
export class CreateUserController implements IController {
  private createUserCommand: ICreateUserCommand
  constructor(command: ICreateUserCommand) {
    this.createUserCommand = command
  }
  run(req: Request, res: Response) {
    this.createUserCommand.execute()
    res.send('good')
  }
}
