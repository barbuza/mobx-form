import { Field, ObjectField } from "../index";
import { notEmpty } from "../validators";
import { IPlainFormData } from "./IPlainFormData";

export class PlainForm extends ObjectField<IPlainFormData> {

  public fields = {
    bar: new Field(0),
    foo: new Field("", [notEmpty()]),
    spam: new Field(false),
  };

}
