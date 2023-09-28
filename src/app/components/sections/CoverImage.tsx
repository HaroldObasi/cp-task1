import React from "react";
import SectionItem from "../ui/SectionItem";
import Uploader from "../ui/Uploader";

type Props = {};

const CoverImage = (props: Props) => {
  return (
    <SectionItem title="Upload Cover Image">
      <Uploader message="Upload cover image" />
    </SectionItem>
  );
};

export default CoverImage;
