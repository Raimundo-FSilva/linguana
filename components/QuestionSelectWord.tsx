import { resetWarningCache } from 'prop-types';
import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import { questionsContext } from '../context/QuestionsContext';
import { Vocabulary } from './Modals/Vocabulary';

type Props = {
  content: string
  result: (points: number) => void
  points: number
  description?: string
  textSmall?: boolean
  responses: string[]
  image: string
  options: { label: string, value: string }[]
};


const Selector = ({action, selected,  index, label}: {action: (data: string) => void, selected: boolean, index: string, label: string}) => {
  const refElement = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    action(index)
  }

  useEffect(() => {
    const element = refElement.current;
    if(!element) return;

    element.classList.remove(selected ? "bg-[#F2F2F2]" : "bg-[#00D930]")
    element.classList.remove(selected ? "text-[#768078]" : "text-white")


    element.classList.add(!selected ? "bg-[#F2F2F2]" : "bg-[#00D930]")
    element.classList.add(!selected ? "text-[#768078]" : "text-white")

    if(selected) {
      element.classList.add("animation-question-select-word-seletor")
      setTimeout(() => {
        element.classList.add("opacity-0")
        element.classList.add("cursor-default")
      }, 200)
    }
    else {
      element.classList.remove("animation-question-select-word-seletor")
      element.classList.remove("opacity-0")
      element.classList.remove("cursor-default")
    }

  }, [selected]);


  return (
    <li
      ref={refElement}
      onClick={handleClick}
      className={"select-none px-3 h-10 transition-all max-sm:text-sm cursor-pointer flex items-center rounded-[6px] capitalize"}>
          {label}
    </li>
  )
}

const Card = ({value, options, textSmall}: {value: string | null, options: { label: string, value: string }[], textSmall?: boolean}) => {
  const refElement = useRef<HTMLSpanElement>(null);
  const responseWord = options.find(opt => opt.value === value);


  useEffect(() => {
    const element = refElement.current
    if(!element) return;


    if(value) {
      element.classList.add("animation-question-select-word-card")
      element.classList.remove("px-8")
      setTimeout(() => element.classList.remove("animation-question-select-word-card"), 400);
    }

    else {
      element.classList.add("px-8")
      element.classList.remove("animation-question-select-word-card")
    }

  }, [value]);

  return (
    <span
      ref={refElement}
      title={"Escolhe uma das opções abaixo!"}
      style={{border: "1px solid #E1E1E1"}}
      className={`bg-[#F7F7F7] px-3 text-[#00CC2D] break-all py-[4px] relative ${textSmall ? "text-base" : "text-xl"}  text-xl font-semibold items-center rounded select-none`}>
      {responseWord?.label}
    </span>
  )
}


export const QuestionSelectWord = (props: Props) => {
  const [responseData, setResponseData] = useState<string | null>(null);


  const context = React.useContext(questionsContext)

  useEffect(() => {
    context.setDescriptionQuest(props.description || "Selecione a palavra correspondente:")
  })

  const handleResponde = (value: string) => setResponseData(value)

  useEffect(() => {
    const response = props.responses[0]

    if(responseData)
      props.result && props.result(response == responseData ? props.points : 0)


  }, [responseData])

  return (
    <div className={"flex max-sm:flex-col max-sm:items-center py-10 gap-10 items-center h-full max-w-[550px] mx-auto"}>
      <img
          alt={"Image quest"}
          width={140}
          src={"/assets/quests/"+props.image}/>


      <div className={"flex flex-col"}>
        <div className={"flex gap-2 flex-wrap max-sm:justify-center"}>
            {
              props.content.split(" ")
                .map(
                  (word, index) =>  
                   word.includes("$data-") ? 
                    <Card 
                      key={index} 
                      textSmall={props.textSmall}
                      options={props.options}
                      value={responseData}/> :
                    <span 
                      key={index} 
                      className={`${props.textSmall ? "text-xl" : "text-2xl"} max-sm:text-xl  select-none font-semibold font-sora text-[#3B403C]`}>
                      {word}
                    </span>
                  )
            }
        </div>

        <ul className={"flex font-sora gap-3 max-sm:justify-center mt-8"}>
          {
            props.options.map((option, key) =>
            
              <Selector
                key={key}
                action={data => handleResponde(data)}
                selected={option.value === responseData}
                index={option.value}
                label={option.label}/>

            )
          }
        </ul>
      </div>


    </div>
  );
};