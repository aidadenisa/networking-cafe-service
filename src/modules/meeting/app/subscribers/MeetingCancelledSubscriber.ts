import type { Result } from '@/app/result'
import type { IDomainEventGenericsSubscriber } from '@/app/subscriber'
import type { MeetingCancelled } from '@/modules/meeting/domain/events/meetingCancelled'

export class MeetingCancelledGenericsSubscriber implements IDomainEventGenericsSubscriber<MeetingCancelled> {
  handle(event: MeetingCancelled): Result<void> {
    console.log('We cancelled a meeting!!!')
    console.log(event)
    return { data: undefined }
  }
}
