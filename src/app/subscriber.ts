import type { Result } from '@/app/result'
import type { DomainEventType, IDomainEvent } from '@/domain/events'

// Subscriber interface when using General Publisher
export interface IDomainEventSubscriber {
  eventType: DomainEventType
  handle(event: IDomainEvent): Result<void>
  canHandle(event: IDomainEvent): boolean
}

// Subscriber interface when using separate Generics Publishers
export interface IDomainEventGenericsSubscriber<T extends IDomainEvent> {
  handle(event: T): Result<void>
}
