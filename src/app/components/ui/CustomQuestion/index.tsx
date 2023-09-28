import React from "react";
import { QuestionTemplate } from "@/app/types/ApplicationForm";

const questionNameMap = {
  Paragraph: "Paragraph",
  ShortAnswer: "Short Answer",
  YesNo: "YesNo",
  Dropdown: "Dropdown",
  MultipleChoice: "MultipleChoice",
  Date: "Date",
  Number: "Number",
  FileUpload: "FileUpload",
};

type Props = {
  lastItem: boolean;
  question: QuestionTemplate;
};

const index = (props: Props) => {
  return (
    <div
      className={`flex justify-between items-center pb-[25px] mb-[25px] ${
        !props.lastItem && "border-b"
      } `}
    >
      <div>
        <p className="text-[14px]">{props.question.type}</p>
        <p className="text-[20px]">{props.question.question}</p>
      </div>
      <div>Edit</div>
    </div>
  );
};

export default index;
