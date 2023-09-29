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
  const [isChecked, setIsChecked] = useState(false);
  const [question, setQuestion] = useState<QuestionTemplate | undefined>(
    undefined
  );

  useEffect(() => {
    if (props.question) {
      setQuestion(props.question);
      console.log("editing mode: ", props.question);
      //WHY DONT YOU SET THE STATE.QUESTION TO THE QUESTION CURRENTLY BEING EDITED ??
    } else {
      setQuestion(state.question);
    }
  }, [state.question]);

  const appendArray = (choice: string) => {
    const newChoiceArr = [...question?.choices!, choice];
    const newQuestion = { ...question!, choices: newChoiceArr };
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const changeChoice = (choice: string, index: number) => {
    const newChoiceArr: Array<string> = question?.choices!;
    newChoiceArr[index] = choice;
    const newQuestion = { ...question!, choices: newChoiceArr };
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const handleCheckboxChange = () => {
    // dispatch action that changes the questions disqualify state
    setIsChecked(!isChecked);
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: { ...state.question!, disqualify: !isChecked },
    });
  };

  console.log("box is checked: ", isChecked);

  return (
    <div className={props.className + ""}>
      <TextInput fieldName="Question" type="text" value="" name="question" />
      {state.questionType === "YesNo" ? (
        <div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Disqualify candidate if the answer is no
          </label>
        </div>
      ) : state.questionType === "Dropdown" ||
        state.questionType === "MultipleChoice" ? (
        <ChoiceMap
          setChoice={changeChoice}
          setter={appendArray}
          array={question?.choices!}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default index;
