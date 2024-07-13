import { InternalError } from '@/app/error'
import { createMockResponse } from '@/infra/http/testUtils'
import { User } from '@/modules/user/domain/user'
import { CreateUserController, type ICreateUserCommand } from '@/modules/user/infra/controllers/createUser'
import { jest } from '@jest/globals'
import type { Request } from 'express'

describe('Create User Controller', () => {
  it('201 - successfully handles the create user request', async () => {
    const result = User.create({ email: 'test@test.com' })
    const mockCreateUserCommand: ICreateUserCommand = {
      execute: async () => result,
    }
    jest.spyOn(mockCreateUserCommand, 'execute')
    const mockRequest = { body: { email: 'test@test.com' } } as Request
    const mockResponse = createMockResponse()

    const controller = new CreateUserController(mockCreateUserCommand)

    await controller.run(mockRequest, mockResponse)

    expect(mockCreateUserCommand.execute as jest.Mock).toHaveBeenCalledWith({ email: 'test@test.com' })
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith(result.data)
  })
  it('400 - fails with Bad Request when the body is not valid', async () => {
    const mockCreateUserCommand: ICreateUserCommand = {} as ICreateUserCommand
    const mockRequest = { body: { id: 'userID' } } as Request
    const mockResponse = createMockResponse()

    const controller = new CreateUserController(mockCreateUserCommand)

    await controller.run(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.send).toHaveBeenCalledWith('Bad request')
  })
  it('500 - fails with Internal Server Error on command error', async () => {
    const error = { error: new InternalError('command error') }
    const mockCreateUserCommand: ICreateUserCommand = {
      execute: async () => error,
    }
    jest.spyOn(mockCreateUserCommand, 'execute')
    const mockRequest = { body: { email: 'test@test.com' } } as Request
    const mockResponse = createMockResponse()

    const controller = new CreateUserController(mockCreateUserCommand)

    await controller.run(mockRequest, mockResponse)

    expect(mockCreateUserCommand.execute as jest.Mock).toHaveBeenCalledWith({ email: 'test@test.com' })
    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.send).toHaveBeenCalledWith('Internal Server Error')
  })
})
