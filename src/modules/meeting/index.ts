import type { IDomainEventPublisher } from '@/app/publisher'
import type { SQLClient } from '@/infra/db/client'
import { CreateMeetingHandler, type IMeetingRepository } from '@/modules/meeting/app/command/CreateMeeting'
import { MeetingCreatedObserver } from '@/modules/meeting/app/observers/MeetingCreatedObserver'
import type { IHttpServer } from '@/modules/user/infra/controllers/routeHandler'

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
    const meetingCretedObserver = new MeetingCreatedObserver()
    this.domainEventsPublisher.subscribe(meetingCretedObserver)

    // TODO: Repo
    const meetingRepo = {} as IMeetingRepository

    const createMeetingCommand = new CreateMeetingHandler(meetingRepo, this.domainEventsPublisher)

    // TODO: HTML controllers
  }
}
