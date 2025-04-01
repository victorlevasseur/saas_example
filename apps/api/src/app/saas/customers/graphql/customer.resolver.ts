import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateCustomerAlreadyExistsError,
  CreateCustomerResult,
} from '../../../../graphql';
import { CreateCustomerDto } from '../dto/create-customer-dto';
import { MapperService } from '../../../core/mapper/mapper.service';
import { CustomersService } from '../service/customers.service';
import { CreateCustomerError } from '../error/create-customer-error';

@Resolver('Customer')
export class CustomerResolver {
  constructor(
    private mapper: MapperService,
    private customerService: CustomersService) {}

  // FIXME: public without any rate limiting/captcha
  @Mutation()
  async createCustomer(
    @Args('input') input: CreateCustomerDto
  ): Promise<CreateCustomerResult> {
    const customer = await this.customerService.createCustomer(input);
    return customer
      .match(
        (customer) => ({ customer }),
        (err) => {
          switch (err) {
            case CreateCustomerError.EXISTING_NAME:
              return {
                error: {
                  __typename: 'CreateCustomerAlreadyExistsError',
                  message: `Customer with name "${input.name}" already exists!`
                }
              }
          }
        }
      );
  }
}
