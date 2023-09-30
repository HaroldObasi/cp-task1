import React, { useState, useContext, useEffect } from "react";
import { QuestionTemplate } from "@/app/types/ApplicationForm";
import editIcon from "@/assets/editIcon.svg";
import Image from "next/image";
import QuestionDetails from "../QuestionDetail";
import { ModalContext } from "@/context/modal.context";

const questionNameMap = {
  Paragraph: "Paragraph",
  ShortAnswer: "Short Answer",
  YesNo: "Yes No",
  Dropdown: "Dropdown",
  MultipleChoice: "Multiple Choice",
  Date: "Date",
  Number: "Number",
  FileUpload: "File Upload",
};

type Props = {
  lastItem: boolean;
  question: QuestionTemplate;
  index: number;
  parent: string;
};

const index = (props: Props) => {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const { state, dispatch } = useContext(ModalContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const question = state.question;

    dispatch({
      type: "EDIT_FORM_INDEX",
      question: question,
      caller: props.parent,
      editIndex: props.index,
    });

    dispatch({
      type: "HIDE",
    });
    setEditingMode(false);
    e.preventDefault();
  };

  const clickEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (state.editIndex !== null) {
      dispatch({
        type: "HIDE",
      });
    } else {
      dispatch({
        type: "EDIT_MODE",
        questionIndex: props.index,
        caller: props.parent,
      });
    }
  };

  console.log("index: ", props.index, state.editIndex);
  console.log("caller: ", props.parent, state.caller);

  return (
    <div className={`${!props.lastItem && "border-b mb-[25px]"} pb-[25px] `}>
      <div className={`flex justify-between items-center`}>
        <div>
          <p className="text-[14px]">{questionNameMap[props.question.type]}</p>
          <p className="text-[20px]">{props.question.question}</p>
        </div>
        <button onClick={(e) => clickEdit(e)}>
          <Image alt="Edit Question" src={editIcon} />
        </button>
      </div>
      {state.editIndex === props.index && state.caller === props.parent && (
        <div>
          <QuestionDetails question={state.question} className="mt-3" />
          <div className="flex justify-between">
            <button
              className="text-red-600"
              onClick={() => console.log("dellet")}
            >
              Delete Question
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="text-white py-1 px-2 bg-green-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
