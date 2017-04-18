import { action, computed, observable } from "mobx";
import { IField } from "./IField";

export class ArrayField<T, F extends IField<T>> implements IField<T[]> {

  @observable
  public fields: F[];

  protected readonly makeField: (value: T) => F;

  constructor(makeField: (value: T) => F) {
    this.makeField = makeField;
    this.fields = [];
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

}
