import { CreateUserHandler, type IUserRepository } from '@/modules/user/app/command/CreateUser'
import { User } from '@/modules/user/domain/user'
import { jest } from '@jest/globals'
describe('CreateUser Command', () => {
  it('successfully creates a new user', async () => {
    const input = {
      email: 'test@testone.co',
    }
    const result = User.create(input)

    const repoMock: IUserRepository = {
      createUser: async () => result,
    }
    jest.spyOn(repoMock, 'createUser')

    const command = new CreateUserHandler(repoMock)

    const { data: actual, error } = await command.execute(input)

    expect(repoMock.createUser as jest.Mock).toHaveBeenCalled()
    expect(actual).toBeDefined()
    expect(actual).toBeInstanceOf(User)
    expect(actual?.email.toString()).toBe(input.email)
    expect(actual?.id).toBeDefined()
    expect(error).not.toBeDefined()
  })
})
