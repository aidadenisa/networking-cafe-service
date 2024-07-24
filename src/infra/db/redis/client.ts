import type { IDatabaseClient } from '@/infra/db/types'
import { createClient, type RedisClientType } from 'redis'

export class RedisClient implements IDatabaseClient {
  private client: RedisClientType
  constructor() {
    console.log(process.env.REDIS_HOST, process.env.REDIS_PORT)
    this.client = createClient({
      url: `${process.env.REDIS_HOST}://localhost:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD,
    })
    this.client.on('error', (err) => console.log('Redis Client Error', err))
  }
  async connect(): Promise<void> {
    await this.client.connect()
    console.log('Redis connected!')
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect()
    } catch (err: any) {
      console.log('Error disconnecting redis: ' + err.message)
    }
    console.log('Redis connection removed.')
  }
  // Function to set a key-value pair in Redis
  async setValue(key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  }

  // Function to retrieve a value by key from Redis
  async getValue(key: string): Promise<string | null> {
    return this.client.get(key)
  }
}
