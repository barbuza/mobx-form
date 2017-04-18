import { observer } from "mobx-react";
import * as React from "react";
import { IField } from "./IField";

@observer
export class Checkbox extends React.Component<React.HTMLProps<HTMLInputElement> & { field: IField<boolean> }, never> {

  public render() {
    const { field, ...props } = this.props;
    return (
      <input
        {...props}
        type="checkbox"
        checked={field.value}
        onChange={this.onChange} />
    );
  }

  protected onChange = (event: { target: { checked: boolean } }) => {
    this.props.field.value = event.target.checked;
  }

}
