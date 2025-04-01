import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer-dto';
import { CustomerDto } from '../dto/customer-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { MapperService } from '../../../core/mapper/mapper.service';
import { err, ok, Result } from 'neverthrow';
import { CreateCustomerError } from '../error/create-customer-error';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
    private mapper: MapperService
  ) {}

  async createCustomer(
    data: CreateCustomerDto
  ): Promise<Result<CustomerDto, CreateCustomerError>> {
    let entity = new CustomerEntity();
    entity.name = data.name;
    entity.publicName = data.publicName;

    try {
      entity = await this.customersRepository.save(entity);
      return ok(this.mapper.getMapper(CustomerEntity, CustomerDto)(entity));
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if ((e as any).constraint === 'IDX_customer_unique_name') {
          return err(CreateCustomerError.EXISTING_NAME);
        }
      }
      throw e;
    }
  }
}
