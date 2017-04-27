import { action, computed, observable } from "mobx";
import { IField } from "./IField";

export class ArrayField<T, F extends IField<T>> implements IField<T[]> {

  public static canBeNamed() {
    // pass
  }

  @computed
  public get version() {
    return this.internalVersion + this.removedVersion + this.fields.reduce((sum, f) => sum + f.version, 0);
  }

  @observable.shallow
  public fields: F[];

  @observable
  protected internalVersion = 0;

  @observable
  protected removedVersion = 0;

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
    this.internalVersion++;
    this.fields.push(this.fieldFactory());
  }

  @action
  public remove(index: number) {
    this.internalVersion++;
    for (const field of this.fields.splice(index, 1)) {
      this.removedVersion += field.version;
    }
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
    if (this.fields.length === val.length) {
      val.forEach((item, index) => {
        this.fields[index].value = item;
      });
    } else {
      this.internalVersion++;
      this.removedVersion += this.fields.reduce((sum, f) => sum + f.version, 0);
      this.fields = val.map(this.makeField);
      this.removedVersion -= this.fields.reduce((sum, f) => sum + f.version, 0);
    }
  }

  protected clone() {
    return new (this.constructor as typeof ArrayField)(this.fieldFactory) as this;
  }

}
