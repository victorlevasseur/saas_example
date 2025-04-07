import { FgaObject } from './fga-object';
import { FgaDirectRelation } from './fga-relation';
import { TupleKey } from '@openfga/sdk';

export interface IFgaTuple {
  produceTupleData(): TupleKey;
}

export class FgaTuple<UserTypeName extends string, ObjectTypeName extends string>
  implements IFgaTuple
{
  constructor(
    public readonly user: FgaObject<UserTypeName>,
    public readonly relation: FgaDirectRelation<UserTypeName, ObjectTypeName>,
    public readonly object: FgaObject<ObjectTypeName>
  ) {
    this.user = user;
    this.relation = relation;
    this.object = object;
  }

  produceTupleData(): TupleKey {
    return {
      user: this.user.toString(),
      relation: this.relation.relationName,
      object: this.object.toString(),
    }
  }
}
