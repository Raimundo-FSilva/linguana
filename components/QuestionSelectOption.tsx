import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import { questionsContext } from '../context/QuestionsContext';
import { ModalContent } from './ModalContent';


type IOption = {
  label: string, 
  correct: boolean 
}

type Props = {
  onResult: (points: number) => void
  points: number
  modal?: {label: string, type: string}
  description?: string

  question: string
  image: string
  options: IOption[]
};



export const QuestionSelectCorrect = (props: Props) => {
  const [response, setResponse] = useState<IOption | null>(null);


  const handleResponde = (value: IOption) => setResponse(value)

  useEffect(() => {
    if(response === null) return;
    const points = response.correct ? props.points : 0 
    props.onResult(points)
  }, [response])

  const context = useContext(questionsContext)

    useEffect(() => {
        context.setDescriptionQuest(props.description || "As palavras destacadas na letra da música acima se referem a estrutura de qual conditional?")
    })

  return (
    <div className={"flex max-sm:flex-col max-sm:items-center py-10 gap-10 items-center h-full max-w-[600px] mx-auto"}>
      <img
          alt={"Image quest"}
          width={140}
          src={"/assets/quests/"+props.image}/>


      <div className={"flex flex-col"}>

        {
          props.modal &&
            <ModalContent
              type={props.modal.type}
              label={props.modal.label}/>

        }

        <span className={"flex mt-6 gap-2 text-2xl font-sora font-semibold text-[#3B403C] flex-wrap max-sm:justify-center"}>
          {props.question}
        </span>

        <ul className={"flex font-sora mt-8 gap-3 max-sm:justify-center"}>
          {
            props.options.map((option, key) =>
              <li key={key} onClick={() => handleResponde(option)} className={` cursor-pointer px-3 py-2 flex items-center border-[1px] rounded-md font-sora text-sm select-none transition-all ${response?.label === option.label ? "bg-[#00D930] text-center text-white" : "hover:bg-[#00D930] bg-gray-100 hover:text-white text-center text-gray-600 hover:scale-95"} `}>
                {option.label}
              </li>
            )
          }
        </ul>
      </div>


    </div>
  );
};