import 'reflect-metadata'
import type { UUID } from 'crypto'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @Column('text', { nullable: false })
  email: string
}
