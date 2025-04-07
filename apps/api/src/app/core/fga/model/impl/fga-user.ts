import { FgaObject } from '../fga-object';
import { FgaDirectRelation } from '../fga-relation';

export function fgaUser(id: string) {
  return new FgaObject('user', id);
}

export const FgaAdminOfSystem = new FgaDirectRelation('user', 'admin', 'system');
