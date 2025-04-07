import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer-dto';
import { CustomerDto } from '../dto/customer-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { MapperService } from '../../../core/mapper/mapper.service';
import { err, ok, Result } from 'neverthrow';
import {
  CreateCustomerError,
  CreateCustomerExistingNameError,
} from '../error/create-customer-error';
import { FgaService } from '../../../core/fga/fga.service';
import { fgaSystemGlobal } from '../../../core/fga/model/impl/fga-system';
import {
  fgaCustomer, FgaManagerOfCustomer, FgaMemberOfCustomer,
  FgaSystemOfCustomer
} from '../../../core/fga/model/impl/fga-customer';
import {
  fgaUser,
} from '../../../core/fga/model/impl/fga-user';
import { UsersService } from '../../users/service/users.service';
import {CreateUserExistingError} from '../../users/error/create-user-error';
import { UserDto } from '../../users/dto/user-dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
    private mapper: MapperService,
    private fgaService: FgaService,
    private usersService: UsersService
  ) {}

  async createCustomer(
    data: CreateCustomerDto
  ): Promise<Result<CustomerDto, CreateCustomerError>> {
    // FIXME: transactions, remediation with external services
    // (supertokens and openfga)

    let entity = new CustomerEntity();
    entity.name = data.name;
    entity.publicName = data.publicName;

    try {
      entity = await this.customersRepository.save(entity);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e as any).constraint === 'IDX_customer_unique_name') {
          return err(new CreateCustomerExistingNameError(data.name));
        }
      }
      throw e;
    }

    const createdUser = await this.usersService.createUser({
      email: data.userEmail
    });

    let user: UserDto;
    if (createdUser.isOk()) {
      user = createdUser.value;
    } else if (createdUser.error instanceof CreateUserExistingError) {
      const findUser = await this.usersService.findUserByEmail(data.userEmail);
      if (findUser.isOk()) {
        user = findUser.value;
      }
    }

    if (!user) {
      throw Error('Unexpected error!');
    }

    await this.fgaService.write({
      writes: [
        FgaSystemOfCustomer.makeTuple(fgaSystemGlobal, fgaCustomer(entity.id)),
        FgaMemberOfCustomer.makeTuple(fgaUser(user.id), fgaCustomer(entity.id)),
        FgaManagerOfCustomer.makeTuple(fgaUser(user.id), fgaCustomer(entity.id)),
      ],
    });

    return ok(this.mapper.getMapper(CustomerEntity, CustomerDto)(entity));
  }
}
