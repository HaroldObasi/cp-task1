"use client";
import React, { useContext } from "react";
import { ModalContext } from "@/context/modal.context";
import { createPortal } from "react-dom";
import DropDown from "../DropDown";
import SectionItem from "../SectionItem";
import QuestionDetails from "../QuestionDetail";
import deleteIcon from "@/assets/delete.svg";
import Image from "next/image";

const Wrapper = () => {
  const { state, dispatch } = useContext(ModalContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const question = state.question;
    const caller = state.caller;

    dispatch({
      type: "UPDATE_FORM",
      question: question,
      caller: caller,
    });

    dispatch({
      type: "HIDE",
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30"></div>
      <div className="z-40  rounded-md mx-5 xs:mx-5 ">
        <SectionItem title="Questions" fullHeight={false}>
          <DropDown title="Type" />
          <QuestionDetails question={state.question} className="my-[25px]" />
          <div className="flex justify-between">
            <button
              className="text-[#A80000] flex items-center font-semibold"
              onClick={() =>
                dispatch({
                  type: "HIDE",
                })
              }
            >
              <Image alt="Delete icon" src={deleteIcon} />
              Delete Question
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="text-white py-1 px-2 bg-[#087B2F] font-semibold rounded"
            >
              Save
            </button>
          </div>
        </SectionItem>
      </div>
    </div>
  );
};

export default function index({ children }: React.PropsWithChildren) {
  const { state, dispatch } = useContext(ModalContext);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted && state.showModal
    ? createPortal(<Wrapper />, document.getElementById("portal")!)
    : null;
}
