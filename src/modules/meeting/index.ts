import { DomainEventCallbackPublisher, DomainEventGenericsPublisher, type IDomainEventPublisher } from '@/app/publisher'
import type { SQLClient } from '@/infra/db/client'
import { CreateMeetingHandler, type IMeetingRepository } from '@/modules/meeting/app/command/CreateMeeting'
import { MeetingCreatedGenericsSubscriber, MeetingCreatedSubscriber } from '@/modules/meeting/app/subscribers/MeetingCreatedSubscriber'
import { MeetingCreated } from '@/modules/meeting/domain/events/meetingCreated'
import type { IHttpServer } from '@/modules/user/infra/controllers/routeHandler'
import type { Result } from '@/app/result'
export class MeetingModule {
  private httpServer: IHttpServer
  private dbClient: SQLClient
  private domainEventsPublisher: IDomainEventPublisher
  constructor(httpServer: IHttpServer, dbClient: SQLClient, pub: IDomainEventPublisher) {
    this.httpServer = httpServer
    this.dbClient = dbClient
    this.domainEventsPublisher = pub
  }
  bootstrap() {
    // Create observers and subscribe them to the domain event publisher

    // 1. Global publisher
    const meetingCreatedSubscriber = new MeetingCreatedSubscriber()
    this.domainEventsPublisher.subscribe(meetingCreatedSubscriber.eventType, meetingCreatedSubscriber)

    // 2. Event specific publisher with generics
    const meetingCreatedPublisher = new DomainEventGenericsPublisher<MeetingCreated>()
    const meetingCreatedGenericSubscriber = new MeetingCreatedGenericsSubscriber()
    meetingCreatedPublisher.subscribe(meetingCreatedGenericSubscriber)

    // POC: If I try to assign a subscriber that doesn't handle this event, I get a TS error
    // const meetingCancelledGenericSubscriber = new MeetingCancelledGenericsSubscriber()
    // meetingCreatedPublisher.subscribe(meetingCancelledGenericSubscriber)

    // 3. Callback Publisher with Generics
    const meetingCreatedHandler = (event: MeetingCreated) => {
      console.log('Meeting created event received in the handler')
      return { data: event }
    }
    const meetingCreatedCallbackPublisher = new DomainEventCallbackPublisher<MeetingCreated>()
    meetingCreatedCallbackPublisher.subscribe(meetingCreatedHandler)

    // TODO: Repo
    const meetingRepo = {} as IMeetingRepository

    const createMeetingCommand = new CreateMeetingHandler(meetingRepo, this.domainEventsPublisher)

    // TODO: HTTP controllers
  }
}
