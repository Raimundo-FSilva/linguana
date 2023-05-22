import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { questionsContext } from "../context/QuestionsContext";

type Props = {
    onResult: (points: number) => void
    dialogs: {en: string, points: number, image: string, disabled: boolean, options: {words: string[], correct: boolean}[]}[]
}

const QuestionDialog = (props: Props) => {
    const [responses, setResponses] = useState<{words: string[], question: number}[]>([])

    const [points, setPoints] = useState(0)
    const [dialogSelected, setDialogSelected] = useState(0)

    const handleSelect = (index: number) => {
        if(dialogSelected === props.dialogs.length-1 && responses.length === props.dialogs.filter(a => !a.disabled).length) return toast.success("Você já respondeu todas questões!")

        let next = dialogSelected+1
        const questionData = props.dialogs[dialogSelected]
        const nextQuestionData = props.dialogs[next]


        if(questionData.options[index].correct){
            setPoints(points+questionData.points)
        }
    
        if(nextQuestionData?.disabled) next = next+1
        if(next < props.dialogs.length) setDialogSelected(next);

        setResponses([...responses, {words: questionData.options[index].words, question: dialogSelected}])
    }
    
    const context = useContext(questionsContext)

    useEffect(() => {
        context.setDescriptionQuest("Complete o diálogo abaixo usando Present Perfect and Past Perfect")
    })

    useEffect(() => {
        const questAmount = props.dialogs.filter(a => !a.disabled).length;

        if(responses.length === questAmount){
            props.onResult(points)
        }

    },[responses])
    

    return ( 
        <div className="w-full  gap-10 px-10 py-4 max-sm:px-0 max-sm:py-10  h-full items-center flex">

            <img alt={"image question"} className="max-sm:hidden" width={140} src={"/assets/quests/"+props.dialogs[dialogSelected].image}/>

            <div className="flex flex-col gap-3 max-sm:w-full">
                <ul className="flex w-full flex-col text-gray-500 font-sora">
                    {
                        props.dialogs.map((dialog, key) => {
                            return (
                                <li key={key} className={`${key === dialogSelected ? "text-gray-900 shadow-md border-[1px]" : ""} px-3 rounded-md transition-all flex max-sm:pl-0  items-center`}>
                                    <span className="ml-2 text-sm leading-7 py-3">
                                        {dialog.en.split(" ").map((data, index) =>{
                                        let message: any = data+" ";
                                        const dataIndex = parseInt(data.replace("$data-", ""));
                                        const answered = responses.find(res => res.question === key);

                                        if(data.includes("$data")){
                                            message = <span key={index} className={`bg-gray-50 text-[#00D930] border-[1px] ${answered ? " px-2" : "px-8 "} rounded mx-2 py-.5 py-1`}>{answered ? answered.words[dataIndex] : ""}</span>
                                        }

                                        
                                        return message }
                                        )}  
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>

                <ul className="flex justify-between w-full gap-3">
                    {
                        props.dialogs[dialogSelected].options.map((opt, index) => 
                            <li
                             key={index} 
                             onClick={() => handleSelect(index)}
                             className="bg-gray-100 border-[1px] w-full max-sm:text-xs justify-center text-sm truncate flex items-center rounded text-gray-800 font-sora select-none cursor-pointer hover:bg-[#00D930] hover:text-white hover:scale-95 transition-all h-8">
                                {opt.words.map((a, index) => opt.words.length-1 > index ? a+" / " : a)}
                            </li>
                        )
                    }
                </ul>
            </div>
            
        </div>
     );
}

export {QuestionDialog};