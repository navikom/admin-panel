import {
  AtLeastOnceType,
  BetweenType,
  ContainsType,
  DoesNotEndWithType,
  DoesNotEqualType,
  DoesNotStartWithType,
  EmptyType,
  EndsWithType,
  EqualType,
  GreaterThanType,
  IsGreaterThanOrEqualType,
  IsLessThanOrEqualType,
  IsNotEmptyType,
  LessThanType,
  NoneOneOfType,
  NotBetweenType,
  OnceType,
  OneOfType,
  StartsWithType,
  AfterType,
  BeforeType,
  WithingType
} from "types/expressions";

export interface IGreaterThan {
  is: GreaterThanType;
  value: number | Date;
}

export interface ILessThan {
  is: LessThanType;
  value: number | Date;
}

export interface IEqual {
  is: EqualType;
  value: number | string | Date;
}

export interface IDoesNotEqual {
  is: DoesNotEqualType;
  value: number | string | Date;
}

export interface IGreaterThanOrEqual {
  is: IsGreaterThanOrEqualType;
  value: number | Date;
}

export interface ILessThanOrEqual {
  is: IsLessThanOrEqualType;
  value: number | Date;
}

export interface IBetween {
  is: BetweenType;
  min: number | Date;
  max: number | Date;
}

export interface INotBetween {
  is: NotBetweenType;
  min: number | Date;
  max: number | Date;
}

export interface IAtLeastOnce {
  is: AtLeastOnceType;
  value: boolean;
}

export interface IOnce {
  is: OnceType;
  value: boolean;
}

export interface IBefore {
  is: BeforeType;
  value: Date;
}

export interface IAfter {
  is: AfterType;
  value: Date;
}

export interface IWithing {
  is: WithingType;
  from: Date;
  to: Date;
}

export interface IIsEmpty {
  is: EmptyType;
  value: boolean;
}

export interface IIsNotEmpty {
  is: IsNotEmptyType;
  value: boolean;
}

export interface IOneOf {
  is: OneOfType;
  value: (string | number)[];
}

export interface INoneOneOf {
  is: NoneOneOfType;
  value: (string | number)[];
}

export interface IStartsWith {
  is: StartsWithType;
  value: string;
}

export interface IDoesNotStartWith {
  is: DoesNotStartWithType;
  value: string;
}

export interface IEndsWith {
  is: EndsWithType;
  value: string;
}

export interface IDoesNotEndWith {
  is: DoesNotEndWithType;
  value: string;
}

export interface IContains {
  is: ContainsType;
  value: string;
}

export type StringExpressionType = IEqual | IDoesNotEqual | IOneOf | INoneOneOf | IEndsWith | IDoesNotEndWith
  | IStartsWith | IDoesNotStartWith | IContains | IIsEmpty | IIsNotEmpty;
export type NumberExpressionType = IGreaterThan | ILessThan | IEqual | IDoesNotEqual | IGreaterThanOrEqual
  | ILessThanOrEqual | IBetween | INotBetween | IOneOf | INoneOneOf | IIsEmpty | IIsNotEmpty;
export type DateExpressionType = IBefore | IAfter | IWithing;
