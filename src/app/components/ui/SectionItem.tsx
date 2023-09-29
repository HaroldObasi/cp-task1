import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
  className?: string;
  innerBodyStyling?: string;
  fullHeight?: boolean;
};

const SectionItem = (props: Props) => {
  return (
    <div
      className={`${
        props.fullHeight === false && "max-h-[487px] overflow-y-auto"
      } w-[595px] shadow-lg rounded-[20px] mb-5 overflow-hidden`}
    >
      <p className="bg-[#D0F7FA] py-[25px] pl-[32px] text-[25px]">
        {props.title}
      </p>
      <div className={"px-[40px] py-[60px] bg-white"}>{props.children}</div>
    </div>
  );
};

export default SectionItem;
