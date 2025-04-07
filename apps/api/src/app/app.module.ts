import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth.module';
import { ConfigModule } from './core/config.module';
import { CustomersModule } from './saas/customers/customers.module';
import { DbModule } from './core/db.module';
import { MapperModule } from './core/mapper/mapper.module';
import { FgaModule } from './core/fga/fga.module';
import { UsersModule } from './saas/users/users.module';

@Module({
  imports: [
    MapperModule,

    ConfigModule.forRoot(),
    AuthModule.forRoot(),
    FgaModule,

    DbModule.forRoot(),

    CustomersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
