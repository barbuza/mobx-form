import { action, computed, observable } from "mobx";
import { ArrayField } from "./ArrayField";
import { IField } from "./IField";

export abstract class ObjectField<T> implements IField<T> {

  @observable
  public abstract fields: {[P in keyof T]: IField<T[P]>};

  public get value(): T {
    return this.valueGetter;
  }

  public set value(val: T) {
    this.valueSetter(val);
  }

  public asArray(): ArrayField<T, this> {
    return new ArrayField<T, this>(() => this.clone());
  }

  @computed
  public get isValid(): boolean {
    for (const key of Object.keys(this.fields)) {
      const field = this.fields[key];
      if (!field.isValid) {
        return false;
      }
    }
    return true;
  }

  @action
  public reset() {
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        this.fields[key].reset();
      }
    }
  }

  @computed
  protected get valueGetter(): T {
    const value: T = {} as T;
    for (const key of Object.keys(this.fields)) {
      value[key] = this.fields[key].value;
    }
    return value;
  }

  @action
  protected valueSetter(val: T) {
    for (const key of Object.keys(val)) {
      this.fields[key].value = val[key];
    }
  }

  protected clone() {
    return new (this.constructor as any)() as this;
  }

}
