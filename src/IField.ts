export interface IField<T> {
  value: T;
  readonly isValid: boolean;
  reset(): void;
}
