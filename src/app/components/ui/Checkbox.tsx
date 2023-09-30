import React from "react";

type Props = {
  checked: boolean;
  label: string;
  formItemName?: string;
  onChange?: (key: string, value: boolean) => void;
};

const Checkbox = (props: Props) => {
  return (
    <label className="text-[15px]">
      <input
        onChange={(e) => props.onChange!(props.formItemName!, e.target.checked)}
        type="checkbox"
        className="accent-green-600 mr-2"
        checked={props.checked}
      />
      {props.label}
    </label>
  );
};

export default Checkbox;
