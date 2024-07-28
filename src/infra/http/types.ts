import type { Request, Response } from 'express'

export interface IController {
  run: (req: Request, res: Response) => any | void
}
