import { DomainEventType, type IDomainEvent } from '@/domain/events'
import type { UUID } from 'crypto'

export class MeetingCancelled implements IDomainEvent {
  type: DomainEventType
  timestamp: Date
  private meetingID: UUID

  constructor(meetingID: UUID) {
    this.meetingID = meetingID
    this.timestamp = new Date()
    this.type = DomainEventType.MeetingCreated // we don't need this type in case we go with separate Generics publishers
  }

  getAggregateID(): UUID {
    return this.meetingID
  }
}
