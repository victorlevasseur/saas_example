import { Reflector } from '@nestjs/core';
import { FgaRelation } from '../model/fga-relation';
import { FgaObject } from '../model/fga-object';

export interface FgaCheckOptions<ObjectTypeName extends string> {
  relation: FgaRelation<'user', ObjectTypeName, boolean>;
  object: (params: Record<string, string>) => FgaObject<ObjectTypeName>;
}

export const FgaCheck =
  Reflector.createDecorator<FgaCheckOptions<string>>();
