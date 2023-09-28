import React, { useContext } from "react";
import SectionItem from "../ui/SectionItem";
import Form from "../ui/Form";
import FormItem from "../ui/Form/FormItem";
import { ModalContext } from "@/context/modal.context";
type Props = {};

function Profile({}: Props) {
  return (
    <SectionItem title="Profile">
      <Form parent="profile">
        <FormItem key="education" name="Education" />
        <FormItem key="experience" name="Experience" />
        <FormItem key="resume" name="Resume" />
      </Form>
    </SectionItem>
  );
}

export default Profile;
