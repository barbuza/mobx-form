import { ArrayField } from "./ArrayField";

export interface IField<T> {
  value: T;
  readonly isValid: boolean;
  readonly version: number;
  reset(): void;
  asArray(): ArrayField<T, this>;
}
