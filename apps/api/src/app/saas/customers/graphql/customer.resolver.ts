import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateCustomerAlreadyExistsError, CreateCustomerInput, CreateCustomerResult } from '../../../../graphql';

@Resolver('Customer')
export class CustomerResolver {

  // FIXME: public without any rate limiting/captcha
  @Mutation()
  async createCustomer(@Args('input') input: CreateCustomerInput): Promise<CreateCustomerResult> {
    // TODO: Implement real behavior!
    return {
      error: {
        __typename: 'CreateCustomerAlreadyExistsError',
        message: `Customer with name "${input.name}" already exists!`
      } as CreateCustomerAlreadyExistsError
    };
  }

}
