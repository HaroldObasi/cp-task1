import React from "react";
import Choice from "./Choice";

type Props = {
  array: string[];
  setter: any;
  setChoice: any;
  setOther: any;
  other: boolean;
};

const ChoiceMap = (props: Props) => {
  return (
    <div>
      {props.array &&
        props.array.map((item, index, arr) => (
          <Choice
            index={index}
            key={index}
            setChoice={props.setChoice}
            setArray={props.setter}
            isLast={index === arr.length - 1}
            item={item}
            array={props.array}
          />
        ))}
      <div className="pt-[25px]">
        <input
          checked={props.other}
          onChange={props.setOther}
          type="checkbox"
        />
        <label className="pt-[25px]"> Enable other option </label>
      </div>
    </div>
  );
};

export default ChoiceMap;
