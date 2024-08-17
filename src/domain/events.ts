import type { UUID } from 'crypto'

export enum DomainEventType {
  MeetingCreated = 'meeting_created',
}
export interface IDomainEvent {
  type: DomainEventType // is not needed when working with generics
  timestamp: Date
  getAggregateID(): UUID
}
