import { Module } from '@nestjs/common';
import { CustomerResolver } from './graphql/customer.resolver';
import { CustomerEntity } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './service/customers.service';
import { MapperService } from '../../core/mapper/mapper.service';
import { registerMappers } from './mapper/mappers';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [
    // GQL Resolvers
    CustomerResolver,

    // Services
    CustomersService,
  ],
})
export class CustomersModule {
  constructor(mapper: MapperService) {
    registerMappers(mapper);
  }
}
