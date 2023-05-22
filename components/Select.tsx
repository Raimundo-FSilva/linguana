// @flow
import * as React from 'react';
import {CaretDown} from "phosphor-react";
import {useRef, useState} from "react";
import useOutsideClick from "../hooks/useOutsideClick";

type Props = {
  placeholder: string
  options: {
    value: string
    label: string
  }[],
  onChange?: (value: string) => void
};

export const Select = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);

  const refContainer = useRef(null);

  useOutsideClick(refContainer, () => opened && setOpened(false))


  const handleChange = (value: string) => {
    props.onChange && props.onChange(value);

    setSelected(value)
    setOpened(false)
  }


  return (

    <div
      ref={refContainer}
      className={"w-full flex flex-col relative"}>
      <label
        onClick={() => setOpened(!opened)}
        style={{border: "1px solid #CCCCCC"}}
        className={"bg-[#FAFAFA] m-0 w-full cursor-pointer  justify-between flex items-center rounded-[4px] outline-0 h-10 font-sora text-sm px-3"}>
        {
          selected ?
          <span className={"font-poppins"}>{props.options.find(d => d.value === selected)?.label}</span> :
          <span className={"text-[#00000060] font-poppins"}>{props.placeholder}</span>
        }
        <CaretDown weight={"bold"} className={"text-[#00000060]"}/>
      </label>

      {
        opened &&
          <ul
              style={{border: "1px solid #CCCCCC"}}
              className={"bg-white absolute z-20 top-[calc(100%+.25rem)] drop-shadow-2xl w-full py-2 rounded"}>
            {
              props.options.map((opt,key) =>
                <li
                  onClick={() => handleChange(opt.value)}
                  className={"select-none hover:bg-gray-100 cursor-pointer transition-all px-3 h-8 flex items-center font-poppins text-sm text-gray-600"}
                  key={key}>
                  {opt.label}
                </li>
              )
            }
          </ul>
      }

    </div>


  );
};