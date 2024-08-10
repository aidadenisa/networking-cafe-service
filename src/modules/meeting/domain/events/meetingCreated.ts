import type { IDomainEvent } from '@/domain/events'
import type { UUID } from 'crypto'

export class MeetingCreated implements IDomainEvent {
  timestamp: Date
  private meetingID: UUID

  constructor(meetingID: UUID) {
    this.meetingID = meetingID
    this.timestamp = new Date()
  }

  getAggregateID(): UUID {
    return this.meetingID
  }
}
