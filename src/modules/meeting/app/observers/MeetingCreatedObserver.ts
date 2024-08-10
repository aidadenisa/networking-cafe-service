import type { Result } from '@/app/result'
import type { IDomainEvent } from '@/domain/events'
import type { IDomainEventObserver } from '@/app/observer'
import { MeetingCreated } from '@/modules/meeting/domain/events/meetingCreated'

export class MeetingCreatedObserver implements IDomainEventObserver {
  canHandle(event: IDomainEvent): boolean {
    return event instanceof MeetingCreated
  }
  handle(event: MeetingCreated): Result<void> {
    console.log('We created a meeting!!!')
    console.log(event)
    return { data: undefined }
  }
}
