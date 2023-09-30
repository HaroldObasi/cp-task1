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
      //WHY DONT YOU SET THE STATE.QUESTION TO THE QUESTION CURRENTLY BEING EDITED ??
    } else {
      setQuestion(state.question);
    }
  }, [state.question]);
  console.log("the questions: ", question);
  const changeQuestionName = (string: string) => {
    const newQuestion = { ...question!, question: string };
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const appendArray = (choice: string) => {
    const newChoiceArr = [...question?.choices!, choice];
    const newQuestion = { ...question!, choices: newChoiceArr };
    // setQuestion(newQuestion);
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const toggleOther = () => {
    const newQuestion = { ...question!, other: !question?.other };
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const changeChoice = (choice: string, index: number) => {
    const newChoiceArr: Array<string> = question?.choices!;
    newChoiceArr[index] = choice;
    const newQuestion = { ...question!, choices: newChoiceArr };
    // setQuestion(newQuestion);
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  const handleCheckboxChange = () => {
    // dispatch action that changes the questions disqualify state
    setIsChecked(!isChecked);
    const newQuestion = { ...question!, disqualify: !isChecked };
    // setQuestion(newQuestion);
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: { ...state.question!, disqualify: !isChecked },
    });
  };

  const changeMaxChoice = (value: number) => {
    const newQuestion = { ...question!, maxValue: value };
    dispatch({
      type: "ADD_QUESTION_FIELD",
      question: newQuestion,
    });
  };

  return (
    <div className={props.className + ""}>
      <TextInput
        placeholder="Type here"
        fieldName="Question"
        type="text"
        value={question?.question as string}
        name="question"
        onChange={changeQuestionName}
      />
      {state.questionType === "YesNo" ? (
        <div>
          <label>
            <input
              type="checkbox"
              className="accent-green-600 mr-2"
              checked={question?.disqualify}
              onChange={handleCheckboxChange}
            />
            Disqualify candidate if the answer is no
          </label>
        </div>
      ) : state.questionType === "Dropdown" ||
        state.questionType === "MultipleChoice" ? (
        <div>
          <ChoiceMap
            setOther={toggleOther}
            other={question?.other!}
            setChoice={changeChoice}
            setter={appendArray}
            array={question?.choices!}
          />

          {state.questionType === "MultipleChoice" && (
            <TextInput
              className="mt-[50px]"
              fieldName="Max choice allowed"
              name="maxChoice"
              type="number"
              placeholder="Enter number of choice allowed here"
              value={props.question?.maxChoice as number}
              onChange={changeMaxChoice}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default index;
