import { observer } from "mobx-react";
import * as React from "react";
import { Checkbox, FieldError, Input } from "../index";
import { ReactFormStore } from "./ReactFormStore";

@observer
export class ReactForm extends React.Component<{ store: ReactFormStore }, never> {

  public render() {
    const { store } = this.props;
    return (
      <div>
        <div>
          <Checkbox className="bar" field={store.fields.bar} />
          <FieldError className="error" field={store.fields.bar} />
        </div>
        <div>
          <Input className="foo" field={store.fields.foo} />
          <FieldError className="error" field={store.fields.foo} />
        </div>
        <div>
          {store.fields.strings.fields.map((field, index) => (
            <div key={index}>
              <Input className="string" field={field} />
              <FieldError className="error" field={field} />
            </div>
          ))}
        </div>
      </div>
    );
  }

}
