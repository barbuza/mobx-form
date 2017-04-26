import { action, computed, intercept, IValueWillChange, observable } from "mobx";
import { ArrayField } from "./ArrayField";
import { IField } from "./IField";
import { IValidator } from "./validators";

export class Field<T> implements IField<T> {

  public static useStaticRendering(val: boolean) {
    Field.staticRendering = val;
  }

  protected static staticRendering = false;

  @observable.ref
  public value: T;

  protected readonly defaultValue: T;
  protected readonly validators: Array<IValidator<T>>;

  constructor(value: T, validators: Array<IValidator<T>> = [], transforms: Array<(value: T) => T> = []) {
    this.defaultValue = value;
    this.value = value;
    this.validators = validators;
    if (!Field.staticRendering && transforms.length) {
      intercept(this, "value", (change: IValueWillChange<T>) => {
        for (const t of transforms) {
          change.newValue = t(change.newValue);
        }
        return change;
      });
    }
  }

  public asArray(): ArrayField<T, this> {
    return new ArrayField<T, this>(() => this.clone());
  }

  @action
  public reset() {
    this.value = this.defaultValue;
  }

  @computed
  public get isValid(): boolean {
    return this.error === null;
  }

  @computed
  public get error(): string | null {
    for (const validator of this.validators) {
      const res = validator(this.value);
      if (res !== null) {
        return res;
      }
    }
    return null;
  }

  protected clone() {
    return new (this.constructor as typeof Field)(this.defaultValue, this.validators) as this;
  }

}
