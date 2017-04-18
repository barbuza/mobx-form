import { ObjectField } from "../index";
import { INestedFormData } from "./INestedFormData";
import { PlainForm } from "./PlainForm";

export class NestedForm extends ObjectField<INestedFormData> {

  public fields = {
    plain: new PlainForm(),
  };

}
