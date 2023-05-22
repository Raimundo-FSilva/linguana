import * as React from 'react';
import {CheckBox} from "./Check";
import {useEffect, useState} from "react";
import { questionsContext } from '../context/QuestionsContext';

type Props = {
  text: string
  response: boolean
  points: number
  image: string
  trueLabel: string
  falseLabel: string
  onResult: (points: number) => void
};
export const QuestionTrueOurFalse = (props: Props) => {
  const [response, setResponse] = useState<boolean | null>(null);

  const handleResponse = (response: boolean) => {
    props.onResult(response === props.response ? props.points : 0);
    setResponse(response)
  }

  const context = React.useContext(questionsContext)
  useEffect(() => {
      context.setDescriptionQuest("Selecione a alternativa correta")
  })

  return (
    <div className={"h-full max-sm:px-0 font-sora max-sm:py-12 flex max-sm:flex-col items-center px-14 gap-10"}>

      <img alt={"question image"} draggable={false} className="w-36 max-sm:w-28 shrink-0" src={"/assets/quests/"+props.image}/>

      <div className={"flex max-sm:w-full flex-col gap-4"}>
        <span className={"text-xl font-semibold text-[#3B403C]"}>
          {props.text}
        </span>

        <div className={"flex gap-10"}>
          <label className={"flex gap-2 text-[#525954] text-sm items-center cursor-pointer select-none"}>
            <CheckBox onChange={() => handleResponse(true)} value={!response ? false : !!response}/>
            {props.trueLabel}
          </label>

          <label className={"flex gap-2 text-[#525954]  items-center text-sm cursor-pointer select-none"}>
            <CheckBox onChange={() => handleResponse(false)} value={response === null ? false : !response}/>
            {props.falseLabel}
          </label>
        </div>
      </div>

    </div>
  );
};