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
      } md:w-[595px] w-full shadow-lg rounded-[20px] mb-5 overflow-hidden`}
    >
      <p className="bg-[#D0F7FA] py-[10px] pl-[14px] text-[20px] md:py-[25px] md:pl-[32px] md:text-[25px]">
        {props.title}
      </p>
      <div className={"px-[10px] py-[30px] sm:px-[40px] sm:py-[60px] bg-white"}>
        {props.children}
      </div>
    </div>
  );
};

export default SectionItem;
