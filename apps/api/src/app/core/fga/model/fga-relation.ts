import { FgaObject } from './fga-object';
import { FgaTuple } from './fga-tuple';
import { FgaCheck } from './fga-check';

export class FgaRelation<UserTypeName extends string, ObjectTypeName extends string, Direct extends boolean> {
  constructor(
    public readonly userTypeName: UserTypeName,
    public readonly relationName: string,
    public readonly objectTypeName: ObjectTypeName,
    public readonly direct: Direct) {

  }

  makeCheck(user: FgaObject<UserTypeName>, object: FgaObject<ObjectTypeName>): FgaCheck<UserTypeName, ObjectTypeName> {
    return new FgaCheck(user, this, object);
  }
}

export class FgaDirectRelation<UserTypeName extends string, ObjectTypeName extends string>
  extends FgaRelation<UserTypeName, ObjectTypeName, true> {

  constructor(
    userTypeName: UserTypeName,
    relationName: string,
    objectTypeName: ObjectTypeName) {
    super(userTypeName, relationName, objectTypeName, true)
  }

  makeTuple(user: FgaObject<UserTypeName>, object: FgaObject<ObjectTypeName>): FgaTuple<UserTypeName, ObjectTypeName> {
    return new FgaTuple(user, this, object);
  }
}

export class FgaImpliedRelation<UserTypeName extends string, ObjectTypeName extends string>
  extends FgaRelation<UserTypeName, ObjectTypeName, false> {

  constructor(
    userTypeName: UserTypeName,
    relationName: string,
    objectTypeName: ObjectTypeName) {
    super(userTypeName, relationName, objectTypeName, false)
  }
}
