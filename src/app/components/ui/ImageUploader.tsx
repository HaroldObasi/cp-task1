import React from "react";

type Props = {
  children: React.ReactNode;
};

const ImageUploader = (props: Props) => {
  return (
    <div
      className={`max-h-[487px] w-[595px] shadow-lg rounded-[20px] mb-5 overflow-hidden`}
    >
      <p className="bg-[#D0F7FA] py-[25px] pl-[32px] text-[25px]">
        Upload cover image
      </p>
      <div className={"px-[40px] py-[60px] bg-white"}>{props.children}</div>
    </div>
  );
};

export default ImageUploader;
