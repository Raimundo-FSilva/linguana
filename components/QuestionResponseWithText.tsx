import { CaretRight } from "phosphor-react";
import {FormEvent, useContext, useEffect, useRef, useState } from "react";
import { questionsContext } from "../context/QuestionsContext";

interface props {
  question: string
  response: string
  points: number
  image: string
  onResult: (points: number) => void
}

export function QuestionReponseWithText(props: props) {
  const refField = useRef<HTMLInputElement>(null);

  const compare = () => {
    const element = refField.current;
    if(!element) return;

    return element.value.toLowerCase().replace(".", "") === props.response.toLowerCase().replace(".", "") || false
  }

  const context = useContext(questionsContext)
    useEffect(() => {
        context.setDescriptionQuest("Escreva as sentenças usando “passive voice”")
    })


  return(
      <div className={"flex items-center max-sm:py-10 max-sm:flex-col max-sm:items-center h-full gap-10 max-w-[550px] mx-auto"}>
        <img alt={"image question"} className="w-36 max-sm:w-28" src={"/assets/quests/"+props.image}/>

        <div
          className={"flex flex-col max-sm:items-center gap-4 w-full"}>

            <span className={"text-2xl select-none font-semibold font-sora text-[#3B403C]"}>
              {props.question}
            </span>


          <div className={"flex gap-3 w-3/4 max-sm:w-full"}>
            <input
              ref={refField}
              style={{border: "1px solid #E1E1E1"}}
              placeholder={"Resposta"}
              onChange={() => props.onResult(!!compare() ? props.points : 0)}
              spellCheck={false}
              className={"bg-[#FAFAFA] w-full rounded-[4px] outline-0 h-10 px-3 font-light font-sora text-xs "}/>
          </div>

        </div>


      </div>
    );
}