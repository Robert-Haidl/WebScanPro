import { DirectiveType } from './directive-type';

export interface Directive {
  type: DirectiveType;
  value: string[];
}
