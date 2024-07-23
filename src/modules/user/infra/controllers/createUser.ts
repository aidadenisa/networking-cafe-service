import type { Result } from '@/app/result'
import type { CreateUserInput } from '@/modules/user/app/command/CreateUser'
import type { User } from '@/modules/user/domain/user'
import type { IController } from '@/modules/user/infra/controllers/routeHandler'
import type { Request, Response } from 'express'

export interface ICreateUserCommand {
  execute: (input: CreateUserInput) => Promise<Result<User>>
}
export class CreateUserController implements IController {
  private createUserCommand: ICreateUserCommand
  constructor(command: ICreateUserCommand) {
    this.createUserCommand = command
  }
  async run(req: Request, res: Response) {
    if (!req.body || !req.body.email) {
      res.status(400).send('Bad request')
      return
    }

    const input: CreateUserInput = { email: req.body.email }

    const { data: user, error } = await this.createUserCommand.execute(input)
    if (error) {
      console.log(error)
      return res.status(error.getCode()).send(error.getAPIResultMessage())
    }

    return res.status(201).json(user)
  }
}
