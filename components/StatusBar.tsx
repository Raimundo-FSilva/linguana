import {Confetti} from "phosphor-react";
import { useContext } from "react";
import { questionsContext } from "../context/QuestionsContext";



export const StatusBar = () => {
  const context = useContext(questionsContext)


  const porcentage = context.questions !== null ? Math.round((100 * context.responses.length)/context.questions.length) : 0;
  

  return (
    <div className={"bg-white max-sm:hidden flex flex-col px-10 py-6 pb-8 rounded-[1rem] border-2 border-[#CCCCCC] items-center gap-3"}>
        {
          context.responses.length > 0 ? 
          <span className={"font-sora text-[#404745] select-none"}>
            Você completou <strong className={"font-bold text-[#0CB231]"}>{porcentage}%</strong> do teste.
          </span>
          :
          <span className={"font-sora text-[#404745] select-none"}>
            Você ainda não começou seu desafio!
          </span>
        }
        
      <div className={" w-full flex relative items-center"}>
        <span style={{boxShadow: "0px 0px 0px 2px rgba(25, 211, 66, 0.25)"}} className={"absolute w-4 h-4 bg-[#19D342] rounded-full z-10 -left-2"}/>
        <div  className={"bg-[#D9D9D920] w-full before:bg-[#1CED4A] before:rounded-r-full h-3 border-y-2 border-[#E1E1E1] "}>
          <div style={{width: `${porcentage}%`}} className="h-2 bg-[#1CED4A] rounded-r-full"/>
        </div>
        <span style={{boxShadow: "0px 0px 0px 2px rgba(25, 211, 66, 0.25)"}} className={"absolute flex items-center justify-center text-white w-8 h-8 bg-[#19D342] rounded-full z-10 -right-2"}>
          <Confetti weight={"bold"}/>
        </span>
      </div>
    </div>
  );
};