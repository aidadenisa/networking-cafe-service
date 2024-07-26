enum ErrorType {
  ErrInternal,
  ErrValidation,
  ErrNotFound,
}

type ErrorConfig = {
  message: string
  type: ErrorType
}

interface IError {
  getCode: () => number
  getAPIResultMessage: () => string
}

class BaseError implements IError {
  message: string
  type: ErrorType

  constructor({ message, type }: ErrorConfig) {
    this.message = message || ''
    this.type = type || ErrorType.ErrInternal
  }

  getCode() {
    return 500
  }

  getAPIResultMessage() {
    return 'Internal Server Error'
  }
}

export class ValidationError extends BaseError implements IError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrValidation })
  }
  getCode() {
    return 400
  }

  getAPIResultMessage() {
    return this.message
  }
}

export class NotFoundError extends BaseError implements IError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrNotFound })
  }
  getCode() {
    return 404
  }
  getAPIResultMessage() {
    return 'Not Found'
  }
}

export class InternalError extends BaseError implements IError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrInternal })
  }

  getCode() {
    return 500
  }

  getAPIResultMessage() {
    return 'Internal Server Error'
  }
}

export type ErrorUnion = InternalError | ValidationError | NotFoundError
