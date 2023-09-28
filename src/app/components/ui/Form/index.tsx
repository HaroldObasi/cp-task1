import React, { useContext } from "react";
import Image from "next/image";
import plusIcon from "@/assets/plus.svg";
import { ModalContext } from "@/context/modal.context";

type Props = {
  children: React.ReactNode;
  parent?: string;
};

const index = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  return (
    <form className="gap-y-10">
      {props.children}
      <button
        className="flex gap-x-5 py-3 px-2 rounded-md hover:bg-gray-200"
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "SHOW", caller: props.parent });
          console.log("form: ", state.showModal);
        }}
      >
        <Image src={plusIcon} alt="Add a question" />
        <p>Add a question</p>
      </button>
    </form>
  );
};

export default index;
