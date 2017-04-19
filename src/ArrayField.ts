import { action, computed, observable } from "mobx";
import { IField } from "./IField";

export class ArrayField<T, F extends IField<T>> implements IField<T[]> {

  public static canBeNamed() {
    // pass
  }

  @observable
  public fields: F[];

  protected readonly makeField: (value: T) => F;
  protected readonly fieldFactory: () => F;

  constructor(fieldFactory: () => F) {
    this.fieldFactory = fieldFactory;
    this.makeField = (value: T) => {
      const field = this.fieldFactory();
      field.value = value;
      return field;
    };
    this.fields = [];
  }

  public asArray(): ArrayField<T[], this> {
    return new ArrayField<T[], this>(() => this.clone());
  }

  @action
  public push() {
    this.fields.push(this.fieldFactory());
  }

  @action
  public remove(index: number) {
    this.fields.splice(index, 1);
  }

  @action
  public reset() {
    this.fields = [];
  }

  @computed
  public get isValid(): boolean {
    for (const field of this.fields) {
      if (!field.isValid) {
        return false;
      }
    }
    return true;
  }

  public get value(): T[] {
    return this.valueGetter;
  }

  public set value(val: T[]) {
    this.valueSetter(val);
  }

  @computed
  protected get valueGetter(): T[] {
    return this.fields.map((t) => t.value);
  }

  @action
  protected valueSetter(val: T[]) {
    this.fields = val.map(this.makeField);
  }

  protected clone() {
    return new (this.constructor as typeof ArrayField)(this.fieldFactory) as this;
  }

}
