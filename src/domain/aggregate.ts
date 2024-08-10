import type { IDomainEvent } from '@/domain/events'

export abstract class AggregateRoot {
  private domainEvents: IDomainEvent[] = []

  getDomainEvents() {
    return this.domainEvents
  }

  addDomainEvent(event: IDomainEvent) {
    this.domainEvents.push()
  }

  clearDomainEvents() {
    this.domainEvents = []
  }
}
