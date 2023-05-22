import axios from "axios";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { accountsContext } from "../context/AccountContext";
import { questionsContext } from "../context/QuestionsContext";

function RegisterResults() {
    const [loading, setloading] = useState(false)

    const context = useContext(questionsContext)
    const userContext = useContext(accountsContext)

    const router = useRouter()


    const handleRegister = async () => {
        setloading(true)

        const incorrectsCalculate = context.responses.filter(res => res.points === 0);
        const correctsCalculate = context.responses.filter(res => res.points > 0);
        
        try {
            const result = await axios.post("/api/register-result", {
                // @ts-ignore
                points: context.points, time: context.timer+1, desafio: (parseInt(router.query.ref) || 0)+1, id: userContext.account?.id, incorrect: incorrectsCalculate.length, correct: correctsCalculate.length
            })
            

            setTimeout(() => router.push(`/finish?ref=${result.data.result.id}`), 2000)

        } catch(err: any) {
            let error = "Ocorreu um erro durante sua requisição."

            if(err.response.data.error)
                error = err.response.data.error;

            toast.error(error)
        }

    }

    useEffect(() => {
        if(!loading && context.validationCompleted)
            handleRegister().then()
    }, [context.loading, context.validationCompleted])
    

    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <div className="border-2 relative flex-col max-sm:px-8 justify-center border-[#CCCCCC] h-full items-center bg-white w-full flex gap-10 max-sm:gap-6 max-w-full px-20 pt-12 pb-8 rounded-lg shadow-lg">
               
                <div className="flex gap-12 max-sm:flex-col max-sm:items-center">
                    <div className="shrink-0">
                        <img width={96} className="animate-bounce" src="/assets/mascote.png"/>
                    </div>


                    <div className="flex flex-col">
                        <span className="text-3xl font-poppins font-bold text-[#48B224] max-sm:text-center">Parabéns!</span>
                        <span className="font-sora mt-2 text-[#404745]  max-sm:text-center">Você respondeu todas as questões, aguarde o calculo da sua nota para continar.</span>
                    </div>
                </div>
               
               


                <div className="flex items-center sm:absolute bottom-20 gap-2 mt-8 select-none">
                    <CircleNotch size={16} className="text-gray-600 animate-spin"/>
                    <span className=" text-sm text-gray-600">Aguarde, estamos salvando seu resultado...</span>
                </div>

               
                

            </div>
        </div>
    );
}

export {RegisterResults};