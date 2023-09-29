import React, { useState } from "react";
import TextInput from "@/app/components/ui/Form/TextInput";
import { useContext } from "react";
import { ModalContext } from "@/context/modal.context";

type Props = {
  className?: string;
};

const index = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const [questionOptions, setQuestionOptions] = useState();
  const [isChecked, setIsChecked] = useState(false);

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
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Disqualify candidate if the answer is no
          </label>
        </div>
      ) : state.questionType === "Dropdown" ? (
        <p>dropdown creator</p>
      ) : state.questionType === "MultipleChoice" ? (
        <p>MultipleChoice picker</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default index;
