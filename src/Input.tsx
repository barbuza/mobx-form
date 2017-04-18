import { observer } from "mobx-react";
import * as React from "react";
import { IField } from "./IField";

@observer
export class Input extends React.Component<React.HTMLProps<HTMLInputElement> & { field: IField<string> }, never> {

  public render() {
    const { field, ...props } = this.props;
    return (
      <input
        {...props}
        type="text"
        value={field.value}
        onChange={this.onChange} />
    );
  }

  protected onChange = (event: { target: { value: string } }) => {
    this.props.field.value = event.target.value;
  }

}
