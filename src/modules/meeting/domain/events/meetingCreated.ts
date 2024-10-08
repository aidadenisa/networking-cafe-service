import { DomainEventType, type IDomainEvent } from '@/domain/events'
import type { UUID } from 'crypto'

export class MeetingCreated implements IDomainEvent {
  type: DomainEventType
  timestamp: Date
  private meetingID: UUID

  constructor(meetingID: UUID) {
    this.meetingID = meetingID
    this.timestamp = new Date()
    this.type = DomainEventType.MeetingCreated
  }

  getAggregateID(): UUID {
    return this.meetingID
  }
}
