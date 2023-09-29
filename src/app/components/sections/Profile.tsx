import React, { useContext } from "react";
import SectionItem from "../ui/SectionItem";
import Form from "../ui/Form";
import FormItem from "../ui/Form/FormItem";
import { ModalContext } from "@/context/modal.context";
import CustomQuestion from "../ui/CustomQuestion";
import { QuestionTemplate } from "@/app/types/ApplicationForm";
type Props = {};

function Profile({}: Props) {
  const { state } = useContext(ModalContext);

  const profileQuestions =
    state.defaultFormAttributes?.profile?.profileQuestions || [];

  return (
    <SectionItem title="Profile">
      <Form parent="profile">
        <FormItem key="education" name="Education" />
        <FormItem key="experience" name="Experience" />
        <FormItem key="resume" name="Resume" />
        {profileQuestions.map(
          (
            item: QuestionTemplate,
            index: number,
            array: Array<QuestionTemplate>
          ) => (
            <CustomQuestion
              question={item}
              key={item.question}
              index={index}
              lastItem={index === array.length - 1}
              parent="profile"
            />
          )
        )}
      </Form>
    </SectionItem>
  );
}

export default Profile;
