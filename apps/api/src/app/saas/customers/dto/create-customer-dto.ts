import { CreateCustomerInput } from '../../../../graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCustomerDto implements CreateCustomerInput {

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  publicName: string;
}
