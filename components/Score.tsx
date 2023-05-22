import Link from "next/link";
import {Diamond, SignOut} from "phosphor-react";
import { useContext } from "react";
import { accountsContext } from "../context/AccountContext";
import { questionsContext } from "../context/QuestionsContext";

export const Score = () => {
  const context = useContext(questionsContext)
  const contextAccounts = useContext(accountsContext)

  return (
    <div className={"bg-white col-start-1  h-full pb-8 max-sm:h-auto col-end-5 justify-between w-full px-6 py-12 max-sm:pt-3 max-sm:pb-6 flex flex-col rounded-[1rem] border-2 border-[#CCCCCC]"}>
      <div className={"flex flex-col"}>
        
        <div className={"flex flex-col gap-6 max-sm:hidden"}>
          <img alt={"logo"} draggable={false} className={'h-8 select-none'} src={"/assets/logoType.svg"}/>
        </div>

        <div className={"flex gap-3 items-center max-sm:mt-2 max-sm:border-[1px] mt-8 bg-[#0CB23110] px-4 py-3 rounded-xl select-none"}>

          <div className={"h-12 w-12 bg-[#FAFAFA] border-2 border-[#CCCCCC] flex items-center justify-center rounded-full"}>
            <img draggable={false} alt={"avatar"} className={"h-9"} src={`/assets/avatars/${(contextAccounts.account?.avatar || 0)+1}.png`}/>
          </div>

          <div className={"flex flex-col font-sora select-none"}>
            <span className={"m-0 text-[#171A19] font-semibold text-sm capitalize"}>{contextAccounts.account?.nome}</span>
            <span className={"text-xs text-[#2E3332]"}>Turma {contextAccounts.account?.turma.padStart(2, "0")}</span>
          </div>
        </div>


        <div className={"flex justify-between mt-8 max-sm:mt-4 font-sora"}>
          <div className={"flex flex-col select-none"}>
            <span className={"text-sm text-[#2E3332] max-sm:text-xs"}>Pontuação</span>
            <div className={'flex  gap-2 max-sm:gap-1 items-center text-[#FD8A04] '}>
              <Diamond  weight={"fill"} className={"h-4 max-sm:h-3"}/>
              <span className={"text-2xl   max-sm:text-base font-bold "}>{context.points} <span className={"uppercase text-sm"}>pt</span></span>
            </div>
          </div>

          <div className={"flex flex-col items-end select-none"}>
            <span className={"text-sm max-sm:text-xs  text-[#2E3332]"}>Tempo</span>

            <span className={"text-2xl font-bold max-sm:text-base text-[#171A19]"}>{Math.floor(context.timer/60).toString().padStart(2, "0")}:{(context.timer-(Math.floor(context.timer/60) *60)).toString().padStart(2, "0")}</span>
          </div>
        </div>

        <div className={"flex flex-col gap-[5px] font-sora select-none max-sm:mt-3 mt-8"}>
          <span className={"text-sm text-[#2E3332] max-sm:text-xs"}>Placar</span>

          <div className={"flex gap-4"}>
            <span className={"bg-[#B20C0C10] text-[#B20C0C] w-2/4 h-10 text-2xl flex items-center px-3 font-bold max-sm:text-base max-sm:px-2 max-sm:h-7 rounded"}>{context.incorrects}</span>
            <span className={"bg-[#0CB23110] text-[#0CB231] w-2/4 h-10 text-2xl flex items-center px-3 font-bold max-sm:text-base max-sm:px-2 max-sm:h-7"}>{context.corrects}</span>
          </div>
        </div>
      </div>



      <div className={"justify-self-end max-sm:hidden flex border-t-2 pt-4 border-[#F2F2F2]"}>
        <Link href={"/revisoes"}>
          <button className={"bg-[#B20C0C10] hover:scale-90 transition-all w-10 flex items-center justify-center rounded h-10"}>
            <SignOut weight={"bold"} size={20} color={"#B20C0C"}/>
          </button>
        </Link>
       
      </div>
    </div>
  );
};