import React from "react";
import plusIcon from "@/assets/plus.svg";
import unorderedList from "@/assets/unorderedList.svg";
import Image from "next/image";

type Props = {
  item: string;
  isLast: boolean;
  setArray: (item: string) => void;
  array: string[];
};

const Choice = (props: Props) => {
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
            value={props.item}
            className="border rounded-md border-[#A0A0A0] text-[#A0A0A0] py-3 px-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col pb-5 justify-end">
          <button
            onClick={() => {
              const newArr = [...props.array, "New string test"];
              props.setArray("New Choice");
              console.log("props arr: ", props.array);
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