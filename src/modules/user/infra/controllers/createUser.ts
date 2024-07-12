import type { CreateUserInput } from '@/modules/user/app/command/CreateUser'
import type { User } from '@/modules/user/domain/user'
import type { IController } from '@/modules/user/infra/controllers/routeHandler'
import type { Request, Response } from 'express'

interface ICreateUserCommand {
  execute: (input: CreateUserInput) => Promise<User>
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

    try {
      const user = await this.createUserCommand.execute(input)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(500).send('Error creating user')
    }
  }
}
