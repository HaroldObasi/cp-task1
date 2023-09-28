import React from "react";
import { ModalContext } from "@/context/modal.context";
import { useContext } from "react";

type Props = {
  fieldName: string;
  name: string;
  value: string;
  onChange?: (e: any) => void;
  type: "text" | "password" | "email";
};

const index = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_QUESTION", question: event.target.value });
  };
  // send name of field (question), text data, to reducer, in the reducer change the current questions question field to the text data
  return (
    <div className="flex flex-col mb-[23px] pb-1">
      <label htmlFor={props.fieldName}>{props.fieldName}</label>
      <input
        className="border rounded-md border-black py-3 px-2 w-full focus:outline-none"
        type={props.type}
        name={props.name}
        onChange={(e) => handleChange(e)}
        id=""
      />
    </div>
  );
};

export default index;
