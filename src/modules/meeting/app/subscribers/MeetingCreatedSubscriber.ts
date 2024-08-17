import type { Result } from '@/app/result'
import { DomainEventType, type IDomainEvent } from '@/domain/events'
import type { IDomainEventGenericsSubscriber, IDomainEventSubscriber } from '@/app/subscriber'
import { MeetingCreated } from '@/modules/meeting/domain/events/meetingCreated'

export class MeetingCreatedSubscriber implements IDomainEventSubscriber {
  eventType: DomainEventType = DomainEventType.MeetingCreated

  canHandle(event: IDomainEvent): boolean {
    return event instanceof MeetingCreated
  }
  handle(event: MeetingCreated): Result<void> {
    console.log('We created a meeting!!!')
    console.log(event)
    return { data: undefined }
  }
}

export class MeetingCreatedGenericsSubscriber implements IDomainEventGenericsSubscriber<MeetingCreated> {
  handle(event: MeetingCreated): Result<void> {
    console.log('We created a meeting!!!')
    console.log(event)
    return { data: undefined }
  }
}
