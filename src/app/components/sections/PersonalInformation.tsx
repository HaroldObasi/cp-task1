import React, { useContext } from "react";
import SectionItem from "../ui/SectionItem";
import Form from "../ui/Form";
import FormItem from "../ui/Form/FormItem";
import { ModalContext } from "@/context/modal.context";
import CustomQuestion from "../ui/CustomQuestion";
import { QuestionTemplate } from "@/app/types/ApplicationForm";
type Props = {};

function PersonalInformation({}: Props) {
  const { state } = useContext(ModalContext);

  const personalQuestions =
    state.defaultFormAttributes?.personalInformation?.personalQuestions || [];

  return (
    <SectionItem title="Personal Information">
      <Form parent="personalInformation">
        <FormItem key="firstName" name="First Name" />
        <FormItem key="lastName" name="Last Name" />
        <FormItem key="email" name="Email" />
        <FormItem
          key="phoneNumber"
          name="Phone Number (without dial code)"
          show
        />
        <FormItem key="nationality" name="Nationality" show />
        <FormItem key="currentResidence" name="Current Residence" show />
        <FormItem key="idNumber" name="ID Number" show />
        <FormItem key="dateOfBirth" name="Date Of Birth" show />
        <FormItem key="gender" name="Gender" show />
        {personalQuestions.map(
          (
            item: QuestionTemplate,
            index: number,
            array: Array<QuestionTemplate>
          ) => (
            <CustomQuestion
              parent="personalInformation"
              question={item}
              key={index}
              index={index}
              lastItem={index === array.length - 1}
            />
          )
        )}
      </Form>
    </SectionItem>
  );
}

export default PersonalInformation;
