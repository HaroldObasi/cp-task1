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
        <FormItem
          parent="profile"
          itemName="education"
          name="Education"
          show={state.defaultFormAttributes?.profile?.education.show}
          mandatory={state.defaultFormAttributes?.profile?.education.mandatory}
        />
        <FormItem
          parent="profile"
          itemName="experience"
          name="Experience"
          show={state.defaultFormAttributes?.profile?.experience.show}
          mandatory={state.defaultFormAttributes?.profile?.experience.mandatory}
        />
        <FormItem
          parent="profile"
          itemName="resume"
          name="Resume"
          show={state.defaultFormAttributes?.profile?.resume.show}
          mandatory={state.defaultFormAttributes?.profile?.resume.mandatory}
        />
        {profileQuestions.map(
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
              parent="profile"
            />
          )
        )}
      </Form>
    </SectionItem>
  );
}

export default Profile;
