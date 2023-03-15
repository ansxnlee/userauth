import { Request, Response, NextFunction } from 'express';
import type { RequestHandler } from 'express'

/**
 * Sessions middleware that checks against the redis cache to see if
 * an authenticated user is allowed to perform the request.
 * Routes to an alternative page upon failure.
 */
export const isAuthed: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  if(req.session.userid) {
    next();
  } else {
    next('/notfound');
  }
}