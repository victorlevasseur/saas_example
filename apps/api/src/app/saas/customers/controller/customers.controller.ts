import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PublicAccess, SuperTokensAuthGuard } from 'supertokens-nestjs';
import { CustomerDto } from '../dto/customer-dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateCustomerDto } from '../dto/create-customer-dto';
import { CustomersService } from '../service/customers.service';
import { FgaCheck } from '../../../core/fga/guard/fga-check.decorator';
import { FgaCanViewBasicInfo, fgaCustomer } from '../../../core/fga/model/impl/fga-customer';
import { FgaCheckGuard } from '../../../core/fga/guard/fga-check.guard';

@Controller('customers')
@ApiBearerAuth()
@UseGuards(SuperTokensAuthGuard, FgaCheckGuard)
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get(':customerId')
  @ApiOkResponse({
    type: CustomerDto,
  })
  @ApiNotFoundResponse({
    description: 'When no customer with the given id is found',
  })
  @FgaCheck({
    relation: FgaCanViewBasicInfo,
    object: (params) => fgaCustomer(params.customerId),
  })
  async findById(
    @Param('customerId') customerId: string
  ): Promise<CustomerDto> {
    return {
      id: customerId,
      name: 'Fake Customer',
      publicName: 'Fake Customer public name',
    };
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: CustomerDto,
  })
  @ApiBadRequestResponse({
    description:
      'When an invalid customer data is provided or a Customer already exists with the given name',
  })
  @PublicAccess()
  async create(@Body() body: CreateCustomerDto): Promise<CustomerDto> {
    const customer = await this.customerService.createCustomer(body);
    if (customer.isErr()) {
      throw customer.error.createHttpException();
    }
    return customer.value;
  }
}
