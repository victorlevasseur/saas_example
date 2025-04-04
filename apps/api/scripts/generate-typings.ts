import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphqls'],
  path: join(process.cwd(), 'src/graphql.ts'),
  emitTypenameField: true
});
