import { ValidationError } from '@/app/error'
import { User } from '@/modules/user/domain/user'

describe('Domain User', () => {
  describe('Create New User', () => {
    it('creates a new user when the input is valid', () => {
      const input = {
        email: 'test@test1.com',
      }

      const { data: actual, error } = User.create(input)

      expect(actual).toBeDefined()
      expect(actual).toBeInstanceOf(User)
      expect(actual?.email.toString()).toBe(input.email)
      expect(actual?.id).toBeDefined()
      expect(error).not.toBeDefined()
    })

    it('returns a validation error when the input is invalid', () => {
      const input = {
        email: 'testest1.com',
      }

      const { data: actual, error } = User.create(input)

      expect(actual).not.toBeDefined()
      expect(error).toBeInstanceOf(ValidationError)
      expect(error?.message).toBe('Invalid Email Address')
    })
  })
})
