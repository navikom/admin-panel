import { ValueType } from "types/expressions";

export interface ISegmentAttributeView {
  currentAttributeName?: string;
  expressions?: string[];
  currentExpression?: string;
  values?: (string | number)[];

  value?: string | number | boolean;
  date?: Date;
  from?: Date;
  to?: Date;
  min?: number;
  max?: number;
  keys?: ValueType[];

  setAttributeName(name: string): void;
  setExpression(value: string): void;
  setValue(value: string | Date | number | (string | number)[], key: ValueType): void;
}
