import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SuperTokensSessionMiddleware } from './super-tokens-session.middleware';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['../../**/*.graphqls'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  exports: [NestGraphQLModule],
})
export class GraphQLModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SuperTokensSessionMiddleware)
      .forRoutes({
        path: 'graphql',
        method: RequestMethod.POST,
      })
  }
}
