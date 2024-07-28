import type { IController } from '@/infra/http/types'
import type { Request, Response } from 'express'

export class ResponseTimeDecorator implements IController {
  private wrappee: IController
  constructor(wrappee: IController) {
    this.wrappee = wrappee
  }
  async run(req: Request, res: Response) {
    const startDatetime = new Date()
    await this.wrappee.run(req, res)
    const endDatetime = new Date()

    const responseTime = endDatetime.getUTCMilliseconds() - startDatetime.getUTCMilliseconds()
    console.log(`Response time: ${responseTime}ms`)
  }
}
