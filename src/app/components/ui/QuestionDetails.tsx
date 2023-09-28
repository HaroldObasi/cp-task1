import React, { useState } from "react";
import TextInput from "@/app/components/ui/Form/TextInput";
import { useContext } from "react";
import { ModalContext } from "@/context/modal.context";

type Props = {};

const QuestionDetails = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const [questionOptions, setQuestionOptions] = useState();
  return (
    <div className="my-[30px]">
      <TextInput fieldName="Question" type="text" value="" />
      {state.questionType === "Paragraph" ||
      state.questionType === "ShortAnswer" ? (
        <p>Paragraph or short answer</p>
      ) : state.questionType === "YesNo" ? (
        <p>Yes no checkbox</p>
      ) : state.questionType === "Dropdown" ? (
        <p>dropdown creator</p>
      ) : state.questionType === "MultipleChoice" ? (
        <p>MultipleChoice picker</p>
      ) : state.questionType === "Date" ? (
        <p>date picker</p>
      ) : state.questionType === "Number" ? (
        <p>Numer picker</p>
      ) : state.questionType === "FileUpload" ? (
        <p>uploader</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionDetails;
