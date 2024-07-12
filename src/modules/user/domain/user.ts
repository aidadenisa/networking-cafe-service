import type { Result } from '@/app/result'
import { Email } from '@/modules/user/domain/email'
import { randomUUID, type UUID } from 'crypto'

interface UserInput {
  id?: UUID
  email: string
}

interface UserProperties {
  id: UUID
  email: Email
}

export class User {
  readonly id: UUID
  readonly email: Email

  private constructor({ id, email }: UserProperties) {
    this.id = id
    this.email = email
  }

  public static create(input: UserInput): Result<User> {
    const { data: email, error } = Email.create(input.email)
    if (error) return { error }

    return {
      data: new User({
        id: input.id ?? randomUUID(),
        email: email,
      }),
    }
  }
}
