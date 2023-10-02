import React from "react";
import { ModalContext } from "@/context/modal.context";
import { useContext } from "react";
import { QuestionTemplate } from "@/app/types/ApplicationForm";

type Props = {
  fieldName: string;
  name: string;
  value: string | number;
  placeholder: string;
  onChange?: any;
  type: "text" | "password" | "email" | "number";
  className?: string;
};

const index = (props: Props) => {

  // send name of field (question), text data, to reducer, in the reducer change the current questions question field to the text data
  return (
    <div className={`${props.className} flex flex-col mb-[23px] pb-1`}>
      <label className="pb-2 font-semibold text-xl" htmlFor={props.fieldName}>
        {props.fieldName}
      </label>
      <input
        className="border rounded-md border-black py-3 px-2 w-full focus:outline-none"
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        id=""
      />
    </div>
  );
};

export default index;
