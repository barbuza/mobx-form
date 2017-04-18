import { ArrayField, Field, ObjectField } from "../index";
import { notEmpty } from "../validators";
import { IReactFormStoreData } from "./IReactFormStoreData";

export class ReactFormStore extends ObjectField<IReactFormStoreData> {

  public fields = {
    bar: new Field(false),
    foo: new Field("", [notEmpty()]),
    strings: new ArrayField<string, Field<string>>(() => new Field("")),
  };

}
