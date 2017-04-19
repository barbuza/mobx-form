// tslint:disable:max-classes-per-file

import { ArrayField, Field, ObjectField } from "../index";
import { notEmpty } from "../validators";

ArrayField.canBeNamed();

export interface IReactFormStoreData {
  bar: boolean;
  foo: string;
  strings: string[];
}

export interface IArrayFormData {
  eggs: string;
  plains: IPlainFormData[];
}

export interface IPlainFormData {
  foo: string;
  bar: number;
  spam: boolean;
}

export interface INestedFormData {
  plain: IPlainFormData;
}

export class PlainForm extends ObjectField<IPlainFormData> {

  public fields = {
    bar: new Field(0),
    foo: new Field("", [notEmpty()]),
    spam: new Field(false),
  };

}

export class ArrayForm extends ObjectField<IArrayFormData> {

  public fields = {
    eggs: new Field(""),
    plains: new PlainForm().asArray(),
  };

}

export class NestedForm extends ObjectField<INestedFormData> {

  public fields = {
    plain: new PlainForm(),
  };

}

export class ReactFormStore extends ObjectField<IReactFormStoreData> {

  public fields = {
    bar: new Field(false),
    foo: new Field("", [notEmpty()]),
    strings: new Field("").asArray(),
  };

}
