import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req.session) {
      /*throw new GraphQLError('Unauthenticated', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })*/
      return false; // FIXME: find a way to have something else instead of FORBIDDEN
    }

    return true;
  }
}
