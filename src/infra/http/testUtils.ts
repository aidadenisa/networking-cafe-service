import type { Response } from 'express'
import { jest } from '@jest/globals'

export const createMockResponse = () => {
  const mockResponse = {} as Response
  mockResponse.status = jest.fn(() => mockResponse)
  mockResponse.json = jest.fn(() => mockResponse)
  mockResponse.send = jest.fn(() => mockResponse)
  return mockResponse
}
