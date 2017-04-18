import { ArrayField, Field, ObjectField } from "../index";
import { IArrayFormData } from "./IArrayFormData";
import { IPlainFormData } from "./IPlainFormData";
import { PlainForm } from "./PlainForm";

export class ArrayForm extends ObjectField<IArrayFormData> {

  public fields = {
    eggs: new Field(""),
    plains: new ArrayField((val: IPlainFormData) => {
      const form = new PlainForm();
      form.value = val;
      return form;
    }),
  };

}
