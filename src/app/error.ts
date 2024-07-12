enum ErrorType {
  ErrInternal,
  ErrValidation,
  ErrNotFound,
}

type ErrorConfig = {
  message: string
  type: ErrorType
}

class BaseError {
  message: string
  type: ErrorType

  constructor({ message, type }: ErrorConfig) {
    this.message = message || ''
    this.type = type || ErrorType.ErrInternal
  }

  getCode() {
    switch (this.type) {
      case ErrorType.ErrValidation:
        return 400
      case ErrorType.ErrNotFound:
        return 404
      case ErrorType.ErrInternal:
      default:
        return 500
    }
  }

  getAPIResultMessage() {
    switch (this.type) {
      case ErrorType.ErrValidation:
        return this.message
      case ErrorType.ErrNotFound:
        return 'Not Found'
      case ErrorType.ErrInternal:
      default:
        return 'Internal Server Error'
    }
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrValidation })
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrNotFound })
  }
}

export class InternalError extends BaseError {
  constructor(message: string) {
    super({ message, type: ErrorType.ErrInternal })
  }
}

export type ErrorUnion = InternalError | ValidationError | NotFoundError
