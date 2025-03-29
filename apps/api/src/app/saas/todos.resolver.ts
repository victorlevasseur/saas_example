import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../core/graphql/gql-auth-guard.service';
import { GqlSession } from '../core/graphql/gql-session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Todo } from '../../graphql';

@Resolver('Todo')
export class TodosResolver {
  @Query()
  @UseGuards(GqlAuthGuard)
  async todos(@GqlSession() session: SessionContainer): Promise<Todo[]> {
    console.log(session);
    return [
      {
        id: '1',
        text: 'This is something to do!',
      },
    ];
  }
}
