import { Invitation, InvitationStatus } from '@/modules/meeting/domain/invitation'
import type { Reservation } from '@/modules/meeting/domain/reservation'
import { randomUUID, type UUID } from 'crypto'

enum MeetingStatus {
  CREATED,
  INVITATIONS_SENT,
  RESERVATION_SENT,
  SCHEDULED,
  CANCELLED,
}

type MeetingProps = {
  id: UUID
  initiatorID: UUID
  inviteesIDs: UUID[]
  locationID: UUID
  startAt: Date
  endAt: Date
  status: MeetingStatus
}

// Meeting Aggregate
export class Meeting {
  private id: UUID
  private initiatorID: UUID
  private locationID: UUID
  private startAt: Date
  private endAt: Date
  private status: MeetingStatus

  private invitations: Invitation[]
  private reservation: Reservation | null

  constructor(props: MeetingProps) {
    this.id = props.id
    this.initiatorID = props.initiatorID
    this.locationID = props.locationID
    this.startAt = props.startAt
    this.endAt = props.endAt
    this.status = props.status
    this.reservation = null
    this.invitations = this.createInvitations(props.inviteesIDs)
  }

  private createInvitations(inviteesIDs: UUID[]): Invitation[] {
    const invitations: Invitation[] = []
    inviteesIDs.forEach((inviteeID) => {
      // If the invitee is the same as the meeting initiator, accept ther invite by default.
      const status = inviteeID === this.initiatorID ? InvitationStatus.ACCEPTED : InvitationStatus.CREATED

      const invitation = new Invitation({
        id: randomUUID(),
        personID: inviteeID,
        status: status,
      })

      invitations.push(invitation)
    })
    return invitations
  }
}
