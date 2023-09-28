import React, { useContext } from "react";
import { QuestionType } from "@/app/types/ApplicationForm";
import { ModalContext } from "@/context/modal.context";

type Props = {
  title: string;
};

type QuestionTypeObject = {
  name: string;
  key: QuestionType;
};

const questionTypes: Array<QuestionTypeObject> = [
  {
    name: "Paragraph",
    key: "Paragraph",
  },
  {
    name: "Short Answer",
    key: "ShortAnswer",
  },
  { name: "Yes No", key: "YesNo" },
  { name: "Dropdown", key: "Dropdown" },
  { name: "Multiple Choice", key: "MultipleChoice" },
  { name: "Date", key: "Date" },
  { name: "Number", key: "Number" },
  { name: "File Upload", key: "FileUpload" },
];

const DropDown = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  return (
    <div>
      <label className="pb-5" htmlFor="type">
        {props.title}
      </label>
      <select
        name="type"
        id=""
        className="border rounded-md border-black py-3 px-2 w-full focus:outline-none"
        onChange={(e) => {
          dispatch({
            type: "CHANGE_QUESTION_TYPE",
            questionType: e.target.value as QuestionType,
          });
        }}
      >
        {questionTypes.map((item) => (
          <option value={item.key}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
