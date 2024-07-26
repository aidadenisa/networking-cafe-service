import type { Result } from '@/app/result'
import { User } from '@/modules/user/domain/user'
import type { UUID } from 'crypto'
import { InternalError } from '@/app/error'
import { UserEntity } from '@/modules/user/infra/repo/user.entity'
import type { EntityTarget, Repository } from 'typeorm'
import type { SQLClient } from '@/infra/db/client'
export interface IUserRepository {
  createUser(input: User): Promise<Result<User>>
  getUserById(id: UUID): Promise<Result<User | null>>
}

interface IDBClient {
  dataSource: {
    getRepository(target: EntityTarget<UserEntity>): Repository<UserEntity>
  }
}
export class UserRepository implements IUserRepository {
  private db: Repository<UserEntity>
  constructor(dbClient: IDBClient) {
    this.db = dbClient.dataSource.getRepository(UserEntity)
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
      result = await this.db.findOneBy({ id: id })
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
