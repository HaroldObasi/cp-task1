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

  // const personalInformation =
  //   state.defaultFormAttributes?.personalInformation || {};

  return (
    <SectionItem title="Personal Information">
      <Form parent="personalInformation">
        <FormItem
          parent="personalInformation"
          itemName="firstName"
          name="First Name"
        />
        <FormItem
          parent="personalInformation"
          itemName="lastName"
          name="Last Name"
        />
        <FormItem parent="personalInformation" itemName="email" name="Email" />
        <FormItem
          parent="personalInformation"
          itemName="phoneNumber"
          name="Phone"
          subText="(without dial code)"
          show={
            state.defaultFormAttributes.personalInformation.phoneNumber.show
          }
          internalUse={
            state.defaultFormAttributes.personalInformation.phoneNumber
              .internalUse
          }
        />
        <FormItem
          parent="personalInformation"
          itemName="nationality"
          name="Nationality"
          show={
            state.defaultFormAttributes.personalInformation.nationality.show
          }
          internalUse={
            state.defaultFormAttributes.personalInformation.nationality
              .internalUse
          }
        />
        <FormItem
          parent="personalInformation"
          itemName="currentResidence"
          name="Current Residence"
          show={
            state.defaultFormAttributes.personalInformation.currentResidence
              .show
          }
          internalUse={
            state.defaultFormAttributes.personalInformation.currentResidence
              .internalUse
          }
        />
        <FormItem
          parent="personalInformation"
          itemName="idNumber"
          name="ID Number"
          show={state.defaultFormAttributes.personalInformation.idNumber.show}
          internalUse={
            state.defaultFormAttributes.personalInformation.idNumber.internalUse
          }
        />
        <FormItem
          parent="personalInformation"
          itemName="dateOfBirth"
          name="Date Of Birth"
          show={
            state.defaultFormAttributes.personalInformation.dateOfBirth.show
          }
          internalUse={
            state.defaultFormAttributes.personalInformation.dateOfBirth
              .internalUse
          }
        />
        <FormItem
          parent="personalInformation"
          itemName="gender"
          name="Gender"
          show={state.defaultFormAttributes.personalInformation.gender.show}
          internalUse={
            state.defaultFormAttributes.personalInformation.gender.internalUse
          }
        />
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
