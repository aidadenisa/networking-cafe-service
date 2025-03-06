import type { DomainEventType, IDomainEvent } from '@/domain/events'
import type { IDomainEventGenericsSubscriber, IDomainEventSubscriber } from '@/app/subscriber'
import type { Result } from '@/app/result'

// Implementations
// ------------------------------------------

// 1. Using a map between events and subscribers

// Not sure that this interface and class are part of the domain or application layer... I would think application because it doesn't contain business logic.
export interface IDomainEventPublisher {
  dispatch(event: IDomainEvent): void
  subscribe(event: DomainEventType, subscriber: IDomainEventSubscriber): void
  unsubscribe(event: DomainEventType, subscriber: IDomainEventSubscriber): void
}
export class DomainEventMapPublisher implements IDomainEventPublisher {
  subscribers: Map<DomainEventType, Set<IDomainEventSubscriber>> = new Map()

  subscribe(eventType: DomainEventType, subscriber: IDomainEventSubscriber) {
    let currentSubscibers = this.subscribers.get(eventType)
    if (currentSubscibers) {
      currentSubscibers.add(subscriber)
    } else {
      currentSubscibers = new Set<IDomainEventSubscriber>([subscriber])
    }
    this.subscribers.set(eventType, currentSubscibers)
  }

  unsubscribe(eventType: DomainEventType, subscriber: IDomainEventSubscriber) {
    const subscribers = this.subscribers.get(eventType)
    if (subscribers) {
      subscribers.delete(subscriber)
      this.subscribers.set(eventType, subscribers)
    }
  }

  dispatch(event: IDomainEvent) {
    const eventSubscribers = this.subscribers.get(event.type)
    if (!eventSubscribers) return

    eventSubscribers.forEach((subscriber) => {
      subscriber.handle(event)
    })
  }
}

// 2. Using generics, create a separate instance for each domain event.
// More about generics constraints here: https://www.geeksforgeeks.org/typescript-generic-constraints/

interface IDomainEventGenericsPublisher {
  dispatch(event: IDomainEvent): void
  subscribe(subscriber: IDomainEventSubscriber): void
  unsubscribe(subscriber: IDomainEventSubscriber): void
}
export class DomainEventGenericsPublisher<T extends IDomainEvent> implements IDomainEventGenericsPublisher {
  subscribers: Set<IDomainEventGenericsSubscriber<T>> = new Set()

  subscribe(subscriber: IDomainEventGenericsSubscriber<T>) {
    this.subscribers.add(subscriber)
  }

  unsubscribe(subscriber: IDomainEventSubscriber) {
    this.subscribers.delete(subscriber)
  }

  dispatch(event: T) {
    if (!this.subscribers.size) return

    this.subscribers.forEach((subscriber: IDomainEventGenericsSubscriber<T>) => {
      // TODO: return/throw errors if that's the case.
      subscriber.handle(event)
    })
  }
}

// 3. Using callback handlers
// Inspiration here: https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events/

// Can be done either as a unique publisher (option 1)
// or as event-specific publishers with generics (option 2).
// I am going with option 2.

type DomainEventHanlder<T extends IDomainEvent> = (event: T) => Result<any>
interface IDomainEventCallbackPublisher<T extends IDomainEvent> {
  dispatch(event: IDomainEvent): void
  subscribe(handler: DomainEventHanlder<T>): void
  unsubscribe(handler: DomainEventHanlder<T>): void
}
export class DomainEventCallbackPublisher<T extends IDomainEvent> implements IDomainEventCallbackPublisher<T> {
  handlers: Set<DomainEventHanlder<T>> = new Set()

  subscribe(handler: DomainEventHanlder<T>) {
    this.handlers.add(handler)
  }

  unsubscribe(handler: DomainEventHanlder<T>) {
    this.handlers.delete(handler)
  }

  dispatch(event: T) {
    if (!this.handlers.size) return

    this.handlers.forEach((handle) => {
      // TODO: return/throw errors if that's the case.
      handle(event)
    })
  }
}
