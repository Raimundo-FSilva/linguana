import {StatusBar} from "../components/StatusBar";
import {Score} from "../components/Score";
import {Quest} from "../components/Quest";
import {Questions} from "../components/Questions";
import {RegisterResults} from "../components/RegisterResults";
import QuestionsContextProvider, { questionsContext } from "../context/QuestionsContext";
import { useContext, useEffect } from "react";
import React from "react";
import { accountsContext } from "../context/AccountContext";
import { useRouter } from "next/router";
import { CircleDashed, CircleNotch } from "phosphor-react";


const QuestContainer = () => {
  const router = useRouter()
  const questionContext = useContext(questionsContext)

  const rel: any = router.query.ref;

  useEffect(() => {
    if(!rel) return;
    console.log("adsas", "1")
    questionContext.setdesafio(rel)
  },[])

  if(!rel) {
    router.push("/revisoes")
    return null;
  }

  if(questionContext.questions === null) return null;
  if(questionContext.currentQuestion === questionContext.questions.length)
    return <RegisterResults/>
  
  return (
    <Quest 
      onNext={() => questionContext.handleNextQuestion()}
      description={"Selecione a opção correta."}>
      <Questions/>
    </Quest>
  );
}

export const Teste = () => {

  const contextAccounts = useContext(accountsContext)

  const router = useRouter()
  

  if(contextAccounts.loading && !contextAccounts.account)
    return (
      <div className={"bg-[#00D930] h-screen w-full flex justify-center items-center py-10"}>
        <CircleNotch className="animate-spin" weight="bold" size={24} color="white"/>
      </div>
    )

  useEffect(() => {
    if(!contextAccounts.account && !contextAccounts.loading) {
      router.push("/minha-conta")
    }
    
  }, [contextAccounts.account, contextAccounts.loading])
  

  return (
    <div className={"bg-[#00D930] min-h-screen  sm:min-h-screen w-full flex  items-center py-10  max-sm:py-4 max-sm:items-start"}>

      <QuestionsContextProvider>

      <div className={"w-full h-full min-h-[680px] max-sm:px-4 max-sm:gap-6 max-w-[1200px] mx-auto grid grid-cols-12 max-sm:flex max-sm:flex-col"}>
        <Score/>

        <div className={"flex flex-col max-sm:h-full col-start-5 gap-6 rounde w-full col-end-13 pl-10 max-sm:pl-0"}>

            <StatusBar/>

            <QuestContainer/>
          
        </div>
      </div>
      </QuestionsContextProvider>

    </div>
  );
};

export default Teste