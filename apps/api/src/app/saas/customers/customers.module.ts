import { Module } from '@nestjs/common';
import { CustomerEntity } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './service/customers.service';
import { MapperService } from '../../core/mapper/mapper.service';
import { registerMappers } from './mapper/mappers';
import { CustomersController } from './controller/customers.controller';
import { FgaModule } from '../../core/fga/fga.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    FgaModule,

    UsersModule
  ],
  controllers: [CustomersController],
  providers: [
    // Services
    CustomersService,
  ],
})
export class CustomersModule {
  constructor(mapper: MapperService) {
    registerMappers(mapper);
  }
}
