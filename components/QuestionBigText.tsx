import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { questionsContext } from "../context/QuestionsContext";

type Props = {
    content: string
    points: number
    refRight: string
    onResult: (points: number) => void
    options: {label: string, correct: boolean}[]
}

const QuestionBigText = (props: Props) => {

    const [selected, setSelected] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        const result = props.options[index].correct
        props.onResult && props.onResult(result ? props.points : 0)
        setSelected(index)
    }
    

    const context = useContext(questionsContext)

    useEffect(() => {
        context.setDescriptionQuest("As palavras destacadas na letra da música se referem a estrutura de qual conditional?")
    })

    return ( 
        <div className="w-full max-w-[550px] max-sm:pb-8 mx-auto h-full justify-center pt-8 flex flex-col items-center">
            
            <span className="text-2xl font-sora max-sm:text-xl font-bold mb-4 text-gray-700" >If I Were A Boy</span>
            
            <p className="text-gray-500 max-sm:text-sm text-center select-none font-sora">
                {
                props.content
                .split(" ")
                .map(
                    (word, key) => 
                            word.includes("$br") ? 
                            <br key={key}/> : 
                            word.includes("$strong") ? <strong className="text-[#00D930]" key={key}>{word.replace("$strong", "").replace("$-", " ")+ " "}</strong>:
                            word+" "
                )}
            </p>
            <span className="text-xs max-sm:text-[10px] max-sm:text-center mt-5 text-gray-500">Beyoncé (álbum: I am... Sasha Fierce – Delux edition – 2008- composição de BC Jean/Toby gad</span>


            <ul className="flex gap-6 mt-8 max-sm:gap-3 max-sm:flex-col">
                {
                    props.options.map((opt, key) =>
                        <li 
                            onClick={() => handleSelect(key)}
                            className={`${selected === key ? "bg-[#00D930] text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:scale-95 "}  font-sora  cursor-pointer transition-all text-sm h-10 max-sm:text-xs max-sm:truncate flex items-center px-3 rounded`}
                            key={key}>
                                {opt.label}
                        </li>
                    )
                }
            </ul>
        </div>
     );
}

export {QuestionBigText};