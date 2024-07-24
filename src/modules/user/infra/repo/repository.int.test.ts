import 'dotenv/config'

import { DBFactory } from '@/infra/db/DBFactory'
import { testDBDown, testDBUp } from '@/infra/db/postgres/testUtils'
import type { IDatabaseClient } from '@/infra/db/types'
import { User } from '@/modules/user/domain/user'
import { UserRepoFactory } from '@/modules/user/infra/repo/factory'

const config = { IN_MEMORY_DB_FLAG: false }
const db: IDatabaseClient = DBFactory.createDB(config)

beforeAll(async () => {
  await testDBUp(db)
})

afterAll(async () => {
  await testDBDown(db)
})

describe('UserRepository Integration Tests', () => {
  it('creates new user', async () => {
    const { data: input, error: err } = User.create({ email: 'test@test1.co' })
    expect(err).toBeUndefined()
    if (!input) {
      return fail('user input creation failed')
    }
    const repo = UserRepoFactory.createRepo(db)

    const { data: result, error } = await repo.createUser(input)

    expect(error).toBeUndefined()
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(User)
    expect(result?.email.toString()).toBe(input.email.toString())
    expect(result?.id).toBe(input.id)

    const { data: actual, error: errr } = await repo.getUserById(input.id)
    expect(errr).toBeUndefined()
    expect(actual).toBeDefined()
    expect(actual).not.toBeNull()
    if (actual) {
      expect(actual.email.toString()).toBe(input.email.toString())
      expect(actual.id).toBe(input.id)
    }
  })
})
