import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
};

const SectionItem = (props: Props) => {
  return (
    <div className="w-[595px] shadow-lg rounded-[20px]">
      {/* <div className="bg-[#D0F7FA] py-[25px] pl-[32px]"></div> */}
      <p className="bg-[#D0F7FA] py-[25px] pl-[32px]">{props.title}</p>
      <div className="px-[40px]">{props.children}</div>
    </div>
  );
};

export default SectionItem;
