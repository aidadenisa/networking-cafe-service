import type { User } from '@/modules/user/domain/user'
import type { IController } from '@/modules/user/infra/controllers/routeHandler'
import type { Request, Response } from 'express'

interface ICreateUserCommand {
  execute: () => User
}
export class CreateUserController implements IController {
  private createUserCommand: ICreateUserCommand
  constructor(command: ICreateUserCommand) {
    this.createUserCommand = command
  }
  run(req: Request, res: Response) {
    const user = this.createUserCommand.execute()
    res.status(201).json(user)
  }
}
