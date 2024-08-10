import type { ICommand } from '@/app/command'
import type { Result } from '@/app/result'
import type { IDomainEventPublisher } from '@/app/publisher'
import { Meeting, MeetingStatus } from '@/modules/meeting/domain/meeting'
import { randomUUID, type UUID } from 'crypto'

export type CreateMeetingInput = {
  meetingID: UUID
  initiatorID: UUID
  inviteesIDs: UUID[]
  locationID: UUID
  startAt: Date
  endAt: Date
}
export interface IMeetingRepository {
  createMeeting: (input: Meeting) => Promise<Result<Meeting>>
}

export class CreateMeetingHandler implements ICommand {
  private repository: IMeetingRepository
  private domainEventsPublisher: IDomainEventPublisher
  constructor(repo: IMeetingRepository, pub: IDomainEventPublisher) {
    this.repository = repo
    this.domainEventsPublisher = pub
  }
  async execute(input: CreateMeetingInput): Promise<Result<Meeting>> {
    console.log('executing create user command')

    const meeting = new Meeting({
      id: randomUUID(),
      initiatorID: input.initiatorID,
      inviteesIDs: input.inviteesIDs,
      locationID: input.locationID,
      startAt: input.startAt,
      endAt: input.endAt,
      status: MeetingStatus.CREATED,
    })

    const result = await this.repository.createMeeting(meeting)
    if (result.error) {
      return result
    }

    // Dispatch meeting events here
    meeting.getDomainEvents().forEach((event) => {
      this.domainEventsPublisher.dispatch(event)
    })

    return result
  }
}
