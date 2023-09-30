import React, { useState } from "react";
import plusIcon from "@/assets/plus.svg";
import unorderedList from "@/assets/unorderedList.svg";
import Image from "next/image";

type Props = {
  item: string;
  index: number;
  isLast: boolean;
  setArray: (item: string) => void;
  setChoice: (item: string, index: number) => void;
  array: string[];
};

const Choice = (props: Props) => {
  const [text, setText] = useState(props.item);

  return (
    <div className={`${!props.isLast && "mb-3"}`}>
      <div className="flex gap-x-3">
        <div className="flex flex-col pb-4 justify-end">
          <Image alt="List item" src={unorderedList} />
        </div>
        <div className="flex flex-col flex-1 ">
          <label htmlFor="">Choice</label>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
              props.setChoice(e.target.value, props.index);
            }}
            value={text}
            className="border rounded-md border-[#A0A0A0] text-[#A0A0A0] py-3 px-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col pb-5 justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setArray("New Choice");
            }}
          >
            {props.isLast && <Image width={15} alt="Add item" src={plusIcon} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choice;
