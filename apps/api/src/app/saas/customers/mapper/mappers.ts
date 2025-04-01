import { MapperService } from '../../../core/mapper/mapper.service';
import { CreateCustomerInput, Customer } from '../../../../graphql';
import { CreateCustomerDto } from '../dto/create-customer-dto';
import { CustomerDto } from '../dto/customer-dto';
import { CustomerEntity } from '../entity/customer.entity';

export function registerMappers(mapperService: MapperService) {
  mapperService.registerMapper<CreateCustomerInput, CreateCustomerDto>(
    'CreateCustomerInput',
    CreateCustomerDto,
    () => (source) => {
      const target = new CreateCustomerDto();
      target.name = source.name;
      target.publicName = source.publicName;
      return target;
    }
  );

  mapperService.registerMapper<CustomerDto, Customer>(
    CustomerDto,
    'Customer',
    () => (source) => {
      return {
        id: source.id,
        name: source.name,
        publicName: source.publicName,
      };
    }
  )

  mapperService.registerMapper(
    CustomerEntity,
    CustomerDto,
    () => (source) => {
      return {
        id: source.id,
        name: source.name,
        publicName: source.publicName,
      };
    }
  );
}
