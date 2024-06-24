import type { ICommand } from '@/app/command'

export class CreateUserHandler implements ICommand {
  execute() {
    console.log('executing create user handler')
  }
}
