import React from "react";
import SectionItem from "./ui/SectionItem";

const MainContent = () => {
  return (
    <div className=" h-screen">
      This is the main content
      <div className="pl-[70px]">
        <SectionItem title="Upload Cover Image">
          <input type="file" name="" id="" />
          <div className="w-full h-[210px] border-2 rounded-[5px] border-dashed">
            <p className="text-center">Upload cover image</p>
            <p className="text-center">
              16:9 Ratio is recommended, Max Image size is 1mb
            </p>
          </div>
        </SectionItem>
      </div>
    </div>
  );
};

export default MainContent;
