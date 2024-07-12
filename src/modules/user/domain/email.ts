import { ValidationError } from '@/app/error'
import type { Result } from '@/app/result'

// Email Value Object
// Enforces validation on the email field
export class Email {
  private value: string
  private static readonly validationRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  private constructor(value: string) {
    this.value = value
  }

  public static create(value: string): Result<Email> {
    if (!this.validate(value)) {
      return { error: new ValidationError('Invalid Email Address') }
    }
    const email = new Email(value)
    return { data: email }
  }

  toString() {
    return this.value
  }

  private static validate(email: string) {
    return this.validationRegex.test(email)
  }
}
