import React, { useEffect, useState, useContext } from "react";

import { ApplicationForm } from "../types/ApplicationForm";
import { ModalContext } from "@/context/modal.context";
import PersonalInformation from "./sections/PersonalInformation";
import Profile from "./sections/Profile";
import AdditionalQuestions from "./sections/AdditionalQuestions";
import CoverImage from "./sections/CoverImage";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";

const MainContent = () => {
  const { dispatch } = useContext(ModalContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const fetchForm = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:4010/api/819.6588064757781/programs/qui/application-form"
      );
      const data: ApplicationForm = await response.json();
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
        <div>
          <div className="flex w-full shadow-md mt-10 pl-[70px]">
            <p className="text-xl pr-[78px] py-[53px]">Program Details</p>
            <p className="text-xl px-[78px] py-[53px] relative  bg-[#00635B] text-white">
              Application Form
              <Image
                src={arrow}
                alt="arrow"
                className="absolute right-[-20px] top-12"
              />
            </p>
            <p className="text-xl px-[78px] py-[53px]">Workflow</p>
            <p className="text-xl pl-[78px] py-[53px]">Preview</p>
          </div>

          <div className="pl-[70px]">
            <CoverImage />
            <PersonalInformation />
            <Profile />
            <AdditionalQuestions />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
