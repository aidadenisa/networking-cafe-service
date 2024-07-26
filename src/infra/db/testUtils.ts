import type { IDatabaseClient } from '@/infra/db/types'
import { v2 as compose } from 'docker-compose'
import path from 'path'

export const testDBUp = async (db: IDatabaseClient) => {
  await compose.downAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
  await compose.upAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
  // We need to wait for the DBs in the containers to have started before connecting or running the tests.
  // TODO: implement a retry mechanism
  await waitSeconds(1)
  await db.connect()
}

export const testDBDown = async (db: IDatabaseClient) => {
  await db.disconnect()
  await compose.downAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
}

const waitSeconds = async (minutes: number) => {
  await new Promise((res) => setTimeout(() => res(undefined), minutes * 1000))
}
