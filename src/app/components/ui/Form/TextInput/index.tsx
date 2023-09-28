import React from "react";

type Props = {
  fieldName: string;
  value: string;
  onChange?: (e: any) => void;
  type: "text" | "password" | "email";
};

const index = (props: Props) => {
  return (
    <div className="flex flex-col mb-[23px] pb-1">
      <label htmlFor={props.fieldName}>{props.fieldName}</label>
      <input
        className="border rounded-md border-black py-3 px-2 w-full focus:outline-none"
        type={props.type}
        name={props.fieldName}
        id=""
      />
    </div>
  );
};

export default index;
