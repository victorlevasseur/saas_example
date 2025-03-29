import { Module } from '@nestjs/common';
import { CustomerResolver } from './graphql/customer.resolver';

@Module({
  providers: [CustomerResolver],
})
export class CustomersModule {}
