import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import SectionItem from "./ui/SectionItem";
import Uploader from "./ui/Uploader";
import Form from "./ui/Form";
import FormItem from "./ui/Form/FormItem";
import { ApplicationForm } from "../types/ApplicationForm";
import { ModalContext } from "@/context/modal.context";
import PersonalInformation from "./sections/PersonalInformation";
import Profile from "./sections/Profile";
import AdditionalQuestions from "./sections/AdditionalQuestions";
import CoverImage from "./sections/CoverImage";

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
      <div className="pl-[70px]">
        <CoverImage />
        <PersonalInformation />
        <Profile />
        <AdditionalQuestions />
      </div>
    </div>
  );
};

export default MainContent;
