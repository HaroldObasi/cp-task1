import React from "react";
import Choice from "./Choice";

type Props = {
  array: string[];
  setter: any;
};

const ChoiceMap = (props: Props) => {
  return (
    <div>
      {props.array.map((item, index, arr) => (
        <Choice
          setArray={props.setter}
          isLast={index === arr.length - 1}
          item={item}
          array={props.array}
        />
      ))}
    </div>
  );
};

export default ChoiceMap;
