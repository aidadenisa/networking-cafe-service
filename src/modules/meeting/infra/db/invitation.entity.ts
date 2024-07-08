import { InvitationStatus } from '@/modules/meeting/domain/invitation'
import type { UUID } from 'crypto'
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column('enum', {
    enum: InvitationStatus,
    default: InvitationStatus.CREATED,
  })
  status: InvitationStatus
}
