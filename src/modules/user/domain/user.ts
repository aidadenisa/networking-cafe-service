import { Email } from '@/modules/user/domain/email'
import { randomUUID, type UUID } from 'crypto'

interface UserInput {
  id?: UUID
  email: string
}

export class User {
  readonly id: UUID
  readonly email: Email

  constructor(properties: UserInput) {
    this.id = properties.id ?? randomUUID()

    this.email = new Email(properties.email)
  }
}
