import type { DatabaseClient } from '@/infra/db/client'
import { v2 as compose } from 'docker-compose'
import path from 'path'

export const testDBUp = async (db: DatabaseClient) => {
  await compose.upAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
  await db.connect()
}

export const testDBDown = async (db: DatabaseClient) => {
  await db.disconnect()
  await compose.downAll({ cwd: path.join(process.cwd(), '/src/infra/db/local'), log: true })
}
