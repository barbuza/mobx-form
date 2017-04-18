import { observer } from "mobx-react";
import * as React from "react";
import { Field } from "./Field";

@observer
export class FieldError extends React.Component<React.HTMLProps<HTMLDivElement> & { field: Field<any> }, never> {

  public render() {
    const { field, ...props } = this.props;
    if (field.error === null) {
      return null;
    }
    return (
      <div {...props}>{field.error}</div>
    );
  }

}
