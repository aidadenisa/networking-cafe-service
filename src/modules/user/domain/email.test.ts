import { ValidationError } from '@/app/error'
import { Email } from '@/modules/user/domain/email'

describe('Domain Email', () => {
  describe('Create New Email', () => {
    it('creates a new email when the input is valid', () => {
      const email = 'test@test1.com'

      const { data: actual, error } = Email.create(email)

      expect(actual).toBeDefined()
      expect(actual).toBeInstanceOf(Email)
      expect(actual?.toString()).toBe(email)
      expect(error).not.toBeDefined()
    })

    it('returns a validation error when the email is invalid', () => {
      const invalidEmail = 'testest1.com'

      const { data: actual, error } = Email.create(invalidEmail)

      expect(actual).not.toBeDefined()
      expect(error).toBeInstanceOf(ValidationError)
      expect(error?.message).toBe('Invalid Email Address')
    })
  })
})
