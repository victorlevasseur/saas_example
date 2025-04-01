import { Injectable } from '@nestjs/common';

type Ctor<T> = new (...args: any[]) => T;

/**
 * Represent a type: either a class (from its constructor)
 * or from a unique name (for interfaces and types, erased at runtime).
 */
export type Type<T> = Ctor<T>|string;

export type Mapper<T, U> = (mapperService: MapperService) => MapFunction<T, U>;

export type MapFunction<T, U> = (source: T) => U;

function getTypeName(type: Ctor<unknown>|string): string {
  if (typeof type === 'string') {
    return type;
  } else {
    return type.name;
  }
}

@Injectable()
export class MapperService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private registeredMappers: { [sourceName: string]: { [targetName: string]: Mapper<any, any> } } = {};

  getMapper<T, U>(sourceClass: Type<T>, targetClass: Type<U>): MapFunction<T, U> {
    const sourceTypeName = getTypeName(sourceClass);
    const targetTypeName = getTypeName(targetClass);

    const mapper =
      this.registeredMappers?.[sourceTypeName]?.[targetTypeName];
    if (!mapper) {
      throw Error(`No mapper found for ${sourceTypeName} -> ${targetTypeName}`);
    }
    return mapper(this) as MapFunction<T, U>;
  }

  registerMapper<T, U>(sourceClass: Type<T>, targetClass: Type<U>, mapper: Mapper<T, U>) {
    const sourceTypeName = getTypeName(sourceClass);
    const targetTypeName = getTypeName(targetClass);

    if (!this.registeredMappers[sourceTypeName]) {
      this.registeredMappers[sourceTypeName] = {}
    }
    this.registeredMappers[sourceTypeName][targetTypeName] = mapper;
  }
}
