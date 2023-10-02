import React, { useContext } from "react";
import Toggle from "../../Toggle";
import Checkbox from "../../Checkbox";
import { ModalContext } from "@/context/modal.context";

type Props = {
  name: string;
  subText?: string;
  itemName: string;
  internalUse?: boolean;
  show?: boolean;
  mandatory?: boolean;
  parent: "personalInformation" | "profile" | "customisedQuestions" | null;
};

const index = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);
  const onChange = (key: string, value: boolean) => {
    dispatch({
      type: "CHANGE_FORM_ITEM",
      caller: props.parent,
      formItemField: props.itemName,
      formItemKey: key,
      formItemValue: value,
    });
  };
  return (
    <div className="pb-[25px] border-b mb-[23px] flex justify-between items-center border-[#C4C4C4]">
      <p className="font-semibold text-xl">
        {props.name} <span className="text-[15px]">{props.subText}</span>
      </p>
      <div className="flex flex-row gap-x-10">
        {props.mandatory !== undefined && (
          <Checkbox
            onChange={onChange}
            checked={props.mandatory}
            label="Mandatory"
            formItemName="mandatory"
          />
        )}
        {props.internalUse !== undefined && (
          <Checkbox
            onChange={onChange}
            checked={props.internalUse}
            label="Internal"
            formItemName="internalUse"
          />
        )}
        {props.show !== undefined && (
          <Toggle onChange={onChange} checked={props.show} />
        )}
      </div>
    </div>
  );
};

export default index;
