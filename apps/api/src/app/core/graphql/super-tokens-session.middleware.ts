import { Injectable, NestMiddleware } from '@nestjs/common';
import Session from 'supertokens-node/recipe/session';

@Injectable({})
export class SuperTokensSessionMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    req.session = await Session
      .getSession(req, res, {sessionRequired: false});
    next();
  }
}
