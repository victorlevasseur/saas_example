import { FgaObject } from '../fga-object';
import { FgaDirectRelation, FgaImpliedRelation } from '../fga-relation';

export function fgaCustomer(id: string) {
  return new FgaObject('customer', id);
}

export const FgaSystemOfCustomer = new FgaDirectRelation('system', 'system', 'customer');

export const FgaMemberOfCustomer = new FgaDirectRelation('user', 'member', 'customer');
export const FgaManagerOfCustomer = new FgaDirectRelation('user', 'manager', 'customer');

export const FgaCanViewBasicInfo = new FgaImpliedRelation('user', 'manager', 'customer');
