import type { Result } from '@/app/result'

export interface ICommand {
  execute: (...args: any[]) => Result<any> | Promise<Result<any>>
}
