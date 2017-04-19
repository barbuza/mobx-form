import { ArrayField } from "./ArrayField";

export interface IField<T> {
  value: T;
  readonly isValid: boolean;
  reset(): void;
  asArray(): ArrayField<T, this>;
}
