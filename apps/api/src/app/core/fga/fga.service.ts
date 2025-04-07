import { Injectable } from '@nestjs/common';
import { OpenFgaClient } from '@openfga/sdk';
import { IFgaTuple } from './model/fga-tuple';
import { FgaRelation } from './model/fga-relation';
import { FgaObject } from './model/fga-object';
import { IFgaCheck } from './model/fga-check';

@Injectable()
export class FgaService {
  constructor(private client: OpenFgaClient) {}

  async write({ writes, deletes }: { writes?: IFgaTuple[]; deletes?: IFgaTuple[] }): Promise<void> {
    await this.client.write({
      writes: writes?.map((tuple) => tuple.produceTupleData()) ?? [],
      deletes: deletes?.map((tuple) => tuple.produceTupleData()) ?? []
    });
  }

  async check(check: IFgaCheck): Promise<boolean> {
    const res = await this.client.check(check.produceCheckData());
    return res.allowed;
  }
}
