"use client";
import React, { useContext } from "react";
import { ModalContext } from "@/context/modal.context";
import { createPortal } from "react-dom";
import DropDown from "../DropDown";
import SectionItem from "../SectionItem";
import QuestionDetails from "../QuestionDetails";

const Wrapper = () => {
  const { state, dispatch } = useContext(ModalContext);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30"></div>
      <div className="z-40  rounded-md mx-5 xs:mx-5 ">
        <SectionItem title="Questions">
          <DropDown title="Type" />
          <QuestionDetails />
          <div className="flex justify-between">
            <button
              className="text-red-600"
              onClick={() => console.log(state.caller)}
            >
              Delete Question
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "HIDE",
                  caller: "null",
                  questionType: "Paragraph",
                })
              }
              className="text-white py-1 px-2 bg-green-600 rounded"
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