import type { UUID } from 'crypto'

export interface IDomainEvent {
  timestamp: Date
  getAggregateID(): UUID
}
