import { MapperService } from '../../../core/mapper/mapper.service';
import { CustomerDto } from '../dto/customer-dto';
import { CustomerEntity } from '../entity/customer.entity';

export function registerMappers(mapperService: MapperService) {
  mapperService.registerMapper(CustomerEntity, CustomerDto, () => (source) => {
    return {
      id: source.id,
      name: source.name,
      publicName: source.publicName,
    };
  });
}
