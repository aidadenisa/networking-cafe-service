import { ValidationError } from '@/app/error'

// Email Value Object
// Enforces validation on the email field
export class Email {
  private value: string
  private readonly validationRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new ValidationError('Invalid Email Address')
    }

    this.value = value
  }

  toString() {
    return this.value
  }

  private validate(email: string) {
    return this.validationRegex.test(email)
  }
}
