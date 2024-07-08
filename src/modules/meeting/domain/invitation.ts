import type { UUID } from 'crypto'

export enum InvitationStatus {
  CREATED = 'created',
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

type InvitationProps = {
  id: UUID
  personID: UUID
  status: InvitationStatus
}

export class Invitation {
  private id: UUID
  private personID: UUID
  private status: InvitationStatus

  constructor(props: InvitationProps) {
    this.id = props.id
    this.personID = props.personID
    this.status = props.status
  }
}
