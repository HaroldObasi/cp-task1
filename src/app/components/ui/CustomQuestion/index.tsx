import React, { useState, useContext, useEffect } from "react";
import { QuestionTemplate } from "@/app/types/ApplicationForm";
import editIcon from "@/assets/editIcon.svg";
import deleteIcon from "@/assets/delete.svg";
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
  parent: "personalInformation" | "profile" | "customisedQuestions" | null;
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
              className="text-[#A80000] flex items-center font-semibold"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: "DELETE_FORM_INDEX",
                  caller: props.parent,
                  questionIndex: props.index,
                });
                dispatch({
                  type: "HIDE",
                });
              }}
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
        </div>
      )}
    </div>
  );
};

export default index;
