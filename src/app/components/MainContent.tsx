import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SectionItem from "./ui/SectionItem";
import Uploader from "./ui/Uploader";
import Form from "./ui/Form";
import FormItem from "./ui/Form/FormItem";
import { ApplicationForm } from "../types/ApplicationForm";
import { ModalContext } from "@/context/modal.context";

const MainContent = () => {
  const { state, dispatch } = useContext(ModalContext);
  const [defaultForm, setDefaultForm] = useState<ApplicationForm | null>(null);
  const fetchForm = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4010/api/819.6588064757781/programs/qui/application-form"
      );
      const data: ApplicationForm = response.data;
      setDefaultForm(data);
      dispatch({
        type: "SET_FORM_ATTRS",
        defaultFormAttributes: data.data.attributes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div className="overflow-y-auto w-full h-screen">
      This is the main content
      <div className="pl-[70px]">
        <SectionItem title="Upload Cover Image">
          <Uploader message="Upload cover image" />
        </SectionItem>

        <SectionItem title="Personal Information">
          <Form parent="personalQuestions">
            <FormItem key="firstName" name="First Name" />
            <FormItem key="lastName" name="Last Name" />
            <FormItem key="email" name="Email" />
            <FormItem key="nationality" name="Nationality" />
            <FormItem key="currentResidence" name="Current Residence" />
            <FormItem key="idNumber" name="ID Number" />
            <FormItem key="dateOfBirth" name="Date Of Birth" />
            <FormItem key="gender" name="Gender" />
          </Form>
        </SectionItem>

        <SectionItem title="Profile">
          <Form parent="profileQuestions">
            <FormItem key="education" name="Education" />
            <FormItem key="experience" name="Experience" />
            <FormItem key="resume" name="Resume" />
          </Form>
        </SectionItem>

        <SectionItem title="Additional Questions">
          render additiona questions
        </SectionItem>
      </div>
    </div>
  );
};

export default MainContent;
