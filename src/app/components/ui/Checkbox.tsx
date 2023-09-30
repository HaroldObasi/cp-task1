import React from "react";

type Props = {
  checked: boolean;
  label: string;
};

const Checkbox = (props: Props) => {
  return (
    <label className="text-[15px]">
      <input type="checkbox" className="accent-green-600 mr-2" checked />
      {props.label}
    </label>
  );
};

export default Checkbox;
