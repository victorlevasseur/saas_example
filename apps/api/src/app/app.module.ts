import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth.module';
import { ConfigModule } from './core/config.module';
import { GraphQLModule } from './core/graphql/graphql.module';
import { TodosResolver } from './saas/todos.resolver';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule.forRoot(), GraphQLModule],
  controllers: [AppController],
  providers: [AppService, TodosResolver],
})
export class AppModule {}
