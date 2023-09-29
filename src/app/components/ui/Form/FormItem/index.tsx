import React from "react";
import {
  QuestionTemplate,
  PersonalInformationTemplate,
  ProfileTemplate,
} from "@/app/types/ApplicationForm";

type Props = {
  name: string;
  key: string;
  internal?: boolean;
  show?: boolean;

};

const index = (props: Props) => {
  return (
    <div className="pb-[25px] border-b mb-[23px]  border-[#C4C4C4]">
      <p className="font-semibold text-xl">{props.name}</p>
    </div>
  );
};

export default index;
