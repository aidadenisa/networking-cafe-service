import { randomUUID, type UUID } from 'crypto'

interface UserProperties {
  id: string
  firstName: string
  lastName: string
  birthday: Date
}

export class User {
  readonly id: UUID
  readonly firstName: string
  readonly lastName: string
  readonly birthday: Date

  constructor(properties: UserProperties) {
    this.id = randomUUID()
    this.firstName = properties.firstName
    this.lastName = properties.lastName
    this.birthday = properties.birthday
  }
}
