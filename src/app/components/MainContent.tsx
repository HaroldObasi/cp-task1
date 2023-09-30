import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { ApplicationForm } from "../types/ApplicationForm";
import { ModalContext } from "@/context/modal.context";
import PersonalInformation from "./sections/PersonalInformation";
import Profile from "./sections/Profile";
import AdditionalQuestions from "./sections/AdditionalQuestions";
import CoverImage from "./sections/CoverImage";

const MainContent = () => {
  const { dispatch } = useContext(ModalContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const fetchForm = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4010/api/819.6588064757781/programs/qui/application-form"
      );
      const data: ApplicationForm = response.data;
      dispatch({
        type: "SET_FORM_ATTRS",
        defaultFormAttributes: data.data.attributes,
      });
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div className={`overflow-y-auto w-full h-screen`}>
      {dataLoaded && (
        <div className="pl-[70px]">
          <CoverImage />
          <PersonalInformation />
          <Profile />
          <AdditionalQuestions />
        </div>
      )}
    </div>
  );
};

export default MainContent;
