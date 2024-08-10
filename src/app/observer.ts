import type { Result } from '@/app/result'
import type { IDomainEvent } from '@/domain/events'

export interface IDomainEventObserver {
  handle(event: IDomainEvent): Result<void>
  canHandle(event: IDomainEvent): boolean
}
