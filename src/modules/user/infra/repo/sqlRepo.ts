import { InternalError } from '@/app/error'
import type { Result } from '@/app/result'
import type { SQLClient } from '@/infra/db/postgres/client'
import { User } from '@/modules/user/domain/user'
import type { IUserRepository } from '@/modules/user/infra/repo/repository'
import { UserEntity } from '@/modules/user/infra/repo/user.entity'
import type { UUID } from 'crypto'
import type { Repository } from 'typeorm'

export class SQLRepository implements IUserRepository {
  private clientRepo: Repository<UserEntity>
  constructor(dbClient: SQLClient) {
    this.clientRepo = dbClient.dataSource.getRepository(UserEntity)
  }
  async createUser(input: User): Promise<Result<User>> {
    const newUser = new UserEntity()
    newUser.id = input.id
    newUser.email = input.email.toString()
    try {
      await newUser.save()
    } catch (error: any) {
      return { error: new InternalError(`error inserting new user in the DB: ${error.message}`) }
    }

    return User.create({
      id: newUser.id,
      email: newUser.email,
    })
  }

  async getUserById(id: UUID): Promise<Result<User | null>> {
    let result: UserEntity | null
    try {
      result = await this.clientRepo.findOneBy({ id: id })
    } catch (error: any) {
      return { error: new InternalError(`error finding user by ID in the DB: ${error.message}`) }
    }

    if (!result) {
      return { data: null }
    }

    return User.create({
      id: result.id,
      email: result.email,
    })
  }
}
