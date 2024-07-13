import { DatabaseClient } from '@/infra/db/client'
import { testDBDown, testDBUp } from '@/infra/db/testUtils'
import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/infra/repo/repository'

const db = new DatabaseClient()

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
    const repo = new UserRepository()

    const { data: result, error } = await repo.createUser(input)

    const actual = await db.query('select * from "user" where id = $1', [input.id])

    expect(error).toBeUndefined()
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(User)
    expect(result?.email.toString()).toBe(input.email.toString())
    expect(result?.id).toBe(input.id)

    expect(actual).toHaveLength(1)
    expect(actual[0]).toBeDefined()
    expect(actual[0]).toBeDefined()
    expect(actual[0].email).toBe(input.email.toString())
    expect(actual[0].id).toBe(input.id)
  })
})
