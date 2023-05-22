import React, { useContext, useEffect, useRef, useState } from "react";
import { questionsContext } from "../context/QuestionsContext";

type Props = {
    onResult: (points: number) => void
    texts: {text: string, points: number}[]
    options: {label: string, quest: number}[]
}

const QuestionConstructText = (props: Props) => {
    const [results, setResults] = useState<number[]>([])
    const [question, setQuestion] = useState<number>(0);
    const [response, setResponse] = useState<number | null>(null);

    const refQuestions = useRef<HTMLDivElement>(null)

    const handleSelect = (index: number) => {
        if(response) return;
        if(props.texts.length <= question) return;

        const element = refQuestions.current;

        if(!element) return;

        element.scrollTo({
            top: element.clientHeight*(question+1), 
            behavior: "smooth"
        })

        setQuestion(question+1)
        setResponse(index);
    }
    
    const context = useContext(questionsContext)

    useEffect(() => {
        context.setDescriptionQuest("Responda às perguntas usando o Reported Speech e complete as sentenças")
    })
    

    useEffect(() => {
        if(response === null) return;

        const correct = props.options.find(opt => opt.quest === response)
        const questionData = props.texts[question-1]

        if(!correct) return;

        setResults([...results, correct?.quest === question-1 ? questionData.points : 0])
        setTimeout(() => setResponse(null), 1000)
    }, [response])

    useEffect(() => {
        if(results.length < props.texts.length) return;

        const points = results.reduce((value, more) => value+ more, 0);
        props.onResult && props.onResult(points);
    }, [results])
    

    return ( 
        <div className="w-full max-w-[480px] py-10 mx-auto h-full gap-10 items-center flex flex-col">

            <div className="relative w-full">
                <span className={`${question+1 > props.texts.length ? "px-2" : "w-6"} h-6 absolute left-2 select-none animate-bounce top-2 bg-[#00D930] text-white rounded-full flex items-center justify-center text-sm font-bold font-poppins`}>
                    {question+1 > props.texts.length ? "Concluido" : question+1}
                </span>
                <div 
                    ref={refQuestions}
                    className="h-20 w-full flex flex-col overflow-hidden">
                    {
                        props.texts.map((text, key) => 
                            <span 
                                key={key}
                                className="rounded-xl max-sm:text-sm font-semibold select-none border-[1px] flex items-center text-center justify-center px-3 py-3 bg-gray-50 text-gray-700 h-full shrink-0">
                                {text.text} <span className="bg-gray-200 border-[1px] border-gray-300 py-3 px-8 rounded-[.25rem] mx-2"></span>
                            </span>
                        )
                    }
                </div>
            </div>

            <ul className="flex flex-col gap-3 w-full">
                    {
                        props.options.map((opt, key) =>
                            <li 
                                onClick={() => handleSelect(key)}
                                className={`${response === key ? "bg-[#00D930] text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:scale-95 "}  font-sora  cursor-pointer transition-all text-sm h-10 flex items-center px-3 rounded`}
                                key={key}>
                                    {opt.label}
                            </li>
                        )
                    }
            </ul>

        </div>
     );
}

export {QuestionConstructText};