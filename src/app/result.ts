import type { ErrorUnion } from '@/app/error'

interface Okay<T> {
  data: T
  error?: never
}

interface Fail {
  data?: never
  error: ErrorUnion
}

export type Result<T> = Okay<T> | Fail
