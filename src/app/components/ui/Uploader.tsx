import React from "react";
import Image from "next/image";
import uploadIcon from "@/assets/upload.svg";

type Props = {
  message: string;
};

const Uploader = (props: Props) => {
  return (
    <div className="w-full h-[210px] flex items-center border-2 rounded-[5px] border-dashed">
      <div className="flex flex-col items-center w-full gap-1">
        <Image src={uploadIcon} alt="Uploader icon" />
        <p className="text-center">{props.message}</p>
        <p className="text-center">
          16:9 Ratio is recommended, Max Image size is 1mb
        </p>
        <input className="hidden" type="file" name="" id="" />
      </div>
    </div>
  );
};

export default Uploader;
