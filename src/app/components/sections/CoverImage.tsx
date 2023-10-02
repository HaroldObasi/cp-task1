import React, { useRef, useState, useContext, useEffect } from "react";
import SectionItem from "../ui/SectionItem";
import Uploader from "../ui/Uploader";
import ImageUploader from "../ui/ImageUploader";
import deleteIcon from "@/assets/delete.svg";
import uploadIcon from "@/assets/upload.svg";
import Image from "next/image";
import { ModalContext } from "@/context/modal.context";

type Props = {};

const CoverImage = (props: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { state, dispatch } = useContext(ModalContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const deleteImage = () => {
    setSelectedImage(null);
    dispatch({
      type: "DELETE_IMAGE",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!selectedImage) {
    return (
      <div
        className={`max-h-[487px] md:w-[595px] w-full shadow-lg rounded-[20px] mb-5 overflow-hidden`}
      >
        <p className="bg-[#D0F7FA] py-[10px] pl-[14px] text-[20px] md:py-[25px] md:pl-[32px] md:text-[25px]">
          Upload cover image
        </p>

        <div
          className={"px-[10px] py-[30px] sm:px-[40px] sm:py-[60px] bg-white"}
        >
          <div className="w-full h-[210px] flex items-center border-2 rounded-[5px] border-dashed cursor-pointer">
            <div
              className="flex flex-col items-center w-full gap-1"
              onClick={() => fileRef?.current?.click()}
            >
              <Image src={uploadIcon} alt="Uploader icon" />
              <p className="text-center">Upload cover image</p>
              <p className="text-center">
                16:9 Ratio is recommended, Max Image size is 1mb
              </p>
              <input
                ref={fileRef}
                onChange={handleImageChange}
                className="hidden"
                type="file"
                name="imgSelect"
                accept="image/*"
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <ImagePreview deleteImage={deleteImage} selectedImage={selectedImage} />
    );
  }
};

type ImagePreviewProps = {
  selectedImage: string;
  deleteImage: () => void;
};

const ImagePreview = (props: ImagePreviewProps) => {
  const { dispatch } = useContext(ModalContext);
  useEffect(() => {
    dispatch({
      type: "UPLOAD_IMAGE",
      imageString: props.selectedImage as string,
    });
  }, []);
  return (
    <div className="max-h-[487px] md:w-[595px] w-full shadow-lg rounded-[20px] mb-5 overflow-hidden">
      <img src={props.selectedImage} className="w-full h-full" alt="Selected" />
      <button
        onClick={() => props.deleteImage()}
        className="py-7 pl-[26px] text-[#A80000] flex items-center font-semibold"
      >
        <Image alt="Delete icon" src={deleteIcon} />
        Delete & re-upload
      </button>
    </div>
  );
};

export default CoverImage;
