import { FgaObject } from './fga-object';
import { FgaRelation } from './fga-relation';
import { TupleKey } from '@openfga/sdk';

export interface IFgaCheck {
  produceCheckData(): TupleKey;
}

export class FgaCheck<UserTypeName extends string, ObjectTypeName extends string>
  implements IFgaCheck
{

  constructor(
    public readonly user: FgaObject<UserTypeName>,
    public readonly relation: FgaRelation<UserTypeName, ObjectTypeName, boolean>,
    public readonly object: FgaObject<ObjectTypeName>
  ) {
    this.user = user;
    this.relation = relation;
    this.object = object;
  }

  produceCheckData(): TupleKey {
    return {
      user: this.user.toString(),
      relation: this.relation.relationName,
      object: this.object.toString(),
    }
  }
}
