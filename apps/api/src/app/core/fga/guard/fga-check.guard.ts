import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FgaCheck } from './fga-check.decorator';
import { SuperTokensAuthGuard } from 'supertokens-nestjs';
import { SessionContainerInterface } from 'supertokens-node/lib/build/recipe/session/types';
import { FgaService } from '../fga.service';
import { fgaUser } from '../model/impl/fga-user';

@Injectable()
export class FgaCheckGuard implements CanActivate {
  private superTokensAuthGuard = new SuperTokensAuthGuard();

  constructor(private reflector: Reflector, private fgaService: FgaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkDecorator = this.reflector.get(FgaCheck, context.getHandler());

    if (!checkDecorator) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    if (!req.session) {
      // If no session is found, run the SuperTokens guard,
      // otherwise, the guard was already setup on the route and ran.
      const checkSession = await this.superTokensAuthGuard.canActivate(context);
      if (!checkSession) {
        return false;
      }
    }

    const session: SessionContainerInterface = req.session;
    const userId = session.getUserId();

    return await this.fgaService.check(
      checkDecorator.relation.makeCheck(
        fgaUser(userId),
        checkDecorator.object(req.params)
      )
    );
  }
}
