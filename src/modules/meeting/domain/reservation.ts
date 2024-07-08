import type { UUID } from 'crypto'

enum ReservationStatus {
  CREATED,
  SENT,
  ACCEPTED,
  REJECTED,
}

type ReservationProps = {
  id: UUID
  status: ReservationStatus
}

export class Reservation {
  private id: UUID
  private status: ReservationStatus

  constructor(props: ReservationProps) {
    this.id = props.id
    this.status = props.status
  }
}
