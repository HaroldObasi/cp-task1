import React from "react";
import {
  QuestionTemplate,
  PersonalInformationTemplate,
  ProfileTemplate,
} from "@/app/types/ApplicationForm";
import Toggle from "../../Toggle";

type Props = {
  name: string;
  key: string;
  internal?: boolean;
  show?: boolean;
  mandatory?: boolean;
};

const index = (props: Props) => {
  console.log("show: ", props.show);
  return (
    <div className="pb-[25px] border-b mb-[23px]  border-[#C4C4C4]">
      <p className="font-semibold text-xl">{props.name}</p>
      {props.show !== undefined && <Toggle checked={true} />}
    </div>
  );
};

export default index;
