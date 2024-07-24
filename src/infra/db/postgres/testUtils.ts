import type { IDatabaseClient } from '@/infra/db/types'
import { v2 as compose } from 'docker-compose'
import path from 'path'

export const testDBUp = async (db: IDatabaseClient) => {
  await compose.downAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
  await compose.upAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
  await db.connect()
}

export const testDBDown = async (db: IDatabaseClient) => {
  await db.disconnect()
  await compose.downAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
}
