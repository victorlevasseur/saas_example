export class FgaObject<Type extends string> {
  type: Type;
  id: string;

  constructor(type: Type, id: string) {
    this.type = type;
    this.id = id;
  }

  toString(): string {
    return `${this.type}:${this.id}`;
  }
}
