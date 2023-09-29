import React, { useContext } from "react";
import SectionItem from "../ui/SectionItem";
import Form from "../ui/Form";
import { ModalContext } from "@/context/modal.context";
import CustomQuestion from "../ui/CustomQuestion";
import { QuestionTemplate } from "@/app/types/ApplicationForm";

type Props = {};

const AdditionalQuestions = (props: Props) => {
  const { state } = useContext(ModalContext);

  const customisedQuestions =
    state.defaultFormAttributes?.customisedQuestions || [];

  return (
    <SectionItem title="Additional Questions">
      <Form parent="customisedQuestions">
        {customisedQuestions.map(
          (
            item: QuestionTemplate,
            index: number,
            array: Array<QuestionTemplate>
          ) => (
            <CustomQuestion
              question={item}
              key={index}
              index={index}
              lastItem={index === array.length - 1}
              parent="customisedQuestions"
            />
          )
        )}
      </Form>
    </SectionItem>
  );
};

export default AdditionalQuestions;
