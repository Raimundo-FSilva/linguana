import {ReactNode, useContext} from "react";
import {ArrowBendUpRight, ArrowRight} from "phosphor-react";
import { questionsContext } from "../context/QuestionsContext";


export const Quest = ({children, description, onNext, onJump}: {children?: ReactNode, description: string, onNext?: () => void, onJump?: () => void}) => {
  const context = useContext(questionsContext)
  
  
  return (
    <div className={"bg-white w-full h-full  p-6 flex px-8 flex-col rounded-[1rem] border-2 border-[#CCCCCC]"}>
      <div className={" border-b-2 shrink-0 flex flex-col gap-1 border-[#F2F2F2] pb-4 max-sm:pb-2 font-sora"}>
        <h2 className={"text-2xl text-gray-800 font-bold max-sm:text-xl"}>

          {
            context.loading ? "Validando" : context.validationCompleted ? "Continue" : `Questão ${context.currentQuestion+1}`
          }
          
        </h2>
        {
          !context.loading && !context.validationCompleted &&
            <span className="text-gray-700 max-sm:text-sm">{context.descriptionQuest}</span>
        }
      </div>

      <div className={"h-full"}>
        {children}
      </div>

      <div className={"font-sora shrink-0 max-sm:justify-center flex justify-end gap-3 pt-4 border-t-2 border-[#F2F2F2]"}>

        {
          !context.loading && !context.validationCompleted &&
            <button
              onClick={context.handleJump}
              className={"flex items-center px-4  max-sm:text-sm max-sm:h-9 rounded hover:scale-90 transition-all font-semibold bg-[#F8E7E7] h-10 text-[#B20C0C] gap-2"}>
                Pular
                <ArrowBendUpRight weight={"bold"}/>
            </button>
        }
        
        <button
          onClick={onNext}
          disabled={context.loading}
          className={`flex items-center px-4 rounded ${!context.loading ? "hover:scale-90" : "opacity-50"} transition-all font-semibold bg-[#00D930] max-sm:text-sm max-sm:h-9 h-10 text-white gap-2`}>
          {context.loading ? "Aguarde..." : context.validationCompleted ? "Continuar" : "Confirmar"}
          {
            !context.loading && !context.validationCompleted &&
              <ArrowRight weight={"bold"}/>
          }
        </button>
      </div>

    </div>
  );
};