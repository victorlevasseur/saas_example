import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth.module';
import { ConfigModule } from './core/config.module';
import { GraphQLModule } from './core/graphql/graphql.module';
import { TodosResolver } from './saas/todos.resolver';
import { CustomersModule } from './saas/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule.forRoot(),
    GraphQLModule,

    CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService, TodosResolver],
})
export class AppModule {}
