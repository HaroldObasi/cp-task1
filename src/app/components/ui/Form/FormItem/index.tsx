import React from "react";
import {
  QuestionTemplate,
  PersonalInformationTemplate,
  ProfileTemplate,
} from "@/app/types/ApplicationForm";
import Toggle from "../../Toggle";
import Checkbox from "../../Checkbox";

type Props = {
  name: string;
  subText?: string;
  key: string;
  internalUse?: boolean;
  show?: boolean;
  mandatory?: boolean;
};

const index = (props: Props) => {
  console.log("show: ", props.show);
  return (
    <div className="pb-[25px] border-b mb-[23px] flex justify-between items-center border-[#C4C4C4]">
      <p className="font-semibold text-xl">
        {props.name} <span className="text-[15px]">{props.subText}</span>
      </p>
      <div className="flex flex-row gap-x-10">
        {props.mandatory !== undefined && (
          <Checkbox checked={props.mandatory} label="Mandatory" />
        )}
        {props.internalUse !== undefined && (
          <Checkbox checked={props.internalUse} label="Internal" />
        )}
        {props.show !== undefined && <Toggle checked={props.show} />}
      </div>
    </div>
  );
};

export default index;
