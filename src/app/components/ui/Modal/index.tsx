"use client";
import React, { useContext } from "react";
import { ModalContext } from "@/context/modal.context";
import { createPortal } from "react-dom";
import DropDown from "../DropDown";
import SectionItem from "../SectionItem";
import QuestionDetails from "../QuestionDetail";

const Wrapper = () => {
  const { state, dispatch } = useContext(ModalContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const question = state.question;
    const caller = state.caller;

    dispatch({
      type: "UPDATE_FORM",
      question: question as any,
      caller: caller as any,
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
            <button className="text-red-600">Delete Question</button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="text-white font-semibold text-base py-1 px-2 bg-green-600 rounded"
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
