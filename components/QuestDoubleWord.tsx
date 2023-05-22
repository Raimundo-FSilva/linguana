import React, { useContext, useEffect, useState } from "react";
import { questionsContext } from "../context/QuestionsContext";

type Props = {
    content: string
    points: number
    image: string
    onResult: (points: number) => void
    options: {words: string[], correct: boolean}[]
}

const QuestionDoubleWord = (props: Props) => {

    const [selected, setSelected] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        const result = props.options[index].correct
        props.onResult && props.onResult(result ? props.points : 0)
        setSelected(index)
    }
    
    const context = useContext(questionsContext)

    useEffect(() => {
        context.setDescriptionQuest("Selecione a opção correta e complete a sentença.")
    })

    return ( 
        <div className="w-full max-w-[450px] py-10 mx-auto h-full justify-between flex flex-col">


                <p className="text-[#3B403C] text-2xl text-center select-none font-sora max-sm:text-xl">
                    {
                        props.content.split(" ").map((word, key) => {

                            let data = word+" ";
                        

                            if(word.includes("$data-")){
                                const index = parseInt(word.replace("$data-", ""))
                                data = selected !== null ? props.options[selected].words[index] : ""

                                return(
                                    <span className={`${data ? "bg-[#00D930] text-white " : "bg-gray-100 text-transparent"} mx-2.5 truncate transition-all max-sm:text-sm font-semibold rounded px-2 py-1 leading-[3rem]`}>
                                        {data || "data"}
                                    </span>
                                )
                            }

                            return data;
                        })
                    }
                </p>

                <ul className="flex flex-col gap-3 mt-8 ">
                    {
                        props.options.map((opt, key) =>
                            <li 
                                onClick={() => handleSelect(key)}
                                className={`${selected === key ? "bg-[#00D930] text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:scale-95 "}  font-sora cursor-pointer transition-all text-sm h-10 flex items-center justify-center px-3 rounded`}
                                key={key}>
                                    {" "+opt.words[0]} and {opt.words[1]}
                            </li>
                        )
                    }
                </ul>


        
        </div>
     );
}

export {QuestionDoubleWord};