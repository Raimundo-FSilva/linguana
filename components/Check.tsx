import {Check} from "phosphor-react";
import {useState} from "react";

type Props = {
  value: boolean;
  onChange: (status: boolean) => void
};

export const CheckBox = (props: Props) => {
  return (
    <label className={`${props.value ? "bg-[#00D930] border-[#00CC2D]" : "bg-[#FAFAFA] border-[#E6E6E6]"} transition cursor-pointer border-2  w-6 h-6 rounded flex items-center justify-center`}>
      <input
        checked={props.value} type={"checkbox"} onChange={(e) => props.onChange(e.target.checked)} className={"hidden"}/>
      {props.value && <Check weight={"bold"} size={14} color={"white"}/>}
    </label>
  );
};