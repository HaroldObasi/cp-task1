import React, { useState, useEffect } from "react";
import TextInput from "@/app/components/ui/Form/TextInput";
import { useContext } from "react";
import { ModalContext } from "@/context/modal.context";
import { QuestionTemplate } from "@/app/types/ApplicationForm";
import ChoiceMap from "./ChoiceMap";

type Props = {
  className?: string;
  question?: QuestionTemplate;
};

const index = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const [questionOptions, setQuestionOptions] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [question, setQuestion] = useState<QuestionTemplate | undefined>(
    undefined
  );

  const appendArray = (choice: string) => {
    const newChoiceArr = [...question?.choices!, choice];
    setQuestion({ ...question!, choices: newChoiceArr });
  };

  useEffect(() => {
    if (props.question) {
      console.log("this is edit mode");
      setQuestion(props.question);
    } else {
      setQuestion(state.question);
      console.log("this is create mode");
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <div className={props.className + ""}>
      <TextInput fieldName="Question" type="text" value="" name="question" />
      {state.questionType === "YesNo" ? (
        <div>
          <label>
            <input
              type="checkbox"
              checked={props.question?.disqualify || isChecked}
              onChange={handleCheckboxChange}
            />
            Disqualify candidate if the answer is no
          </label>
        </div>
      ) : state.questionType === "Dropdown" ||
        state.questionType === "MultipleChoice" ? (
        <ChoiceMap setter={appendArray} array={question?.choices!} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default index;
