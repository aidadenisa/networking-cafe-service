import type { IDomainEvent } from '@/domain/events'
import type { IDomainEventObserver } from '@/app/observer'

// Not sure that this interface and class are part of the domain or application layer... I would think application because it doesn't contain business logic.
export interface IDomainEventPublisher {
  dispatch(event: IDomainEvent): void
  subscribe(observer: IDomainEventObserver): void
  unsubscribe(observer: IDomainEventObserver): void
}

export class DomainEventPublisher implements IDomainEventPublisher {
  observers: IDomainEventObserver[] = []

  subscribe(observer: IDomainEventObserver) {
    this.observers.push(observer)
  }

  unsubscribe(observer: IDomainEventObserver) {
    const index = this.observers.findIndex((o) => o === observer)
    this.observers.splice(index, 1)
  }

  dispatch(event: IDomainEvent) {
    if (!this.observers.length) return

    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i]?.canHandle(event)) {
        // TODO: return/throw errors if that's the case.
        this.observers[i]?.handle(event)
      }
    }
  }
}
