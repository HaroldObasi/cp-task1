import React from "react";

type Props = {
  checked: boolean;
  onChange: (key: string, value: boolean) => void;
  formItemName?: string;
};

function Toggle(props: Props) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        checked={props.checked}
        onChange={(e) => {
          props.onChange("show", e.target.checked);
        }}
        type="checkbox"
        value=""
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-50 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-gray-300  peer-checked:bg-green-600"></div>
      <span className="ml-2 text-base font-normal text-[#666666]">
        {props.checked ? "Show" : "Hide"}
      </span>
    </label>
  );
}

export default Toggle;
