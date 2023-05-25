import React, { useEffect, useState } from "react"

const data = {
    words: [
        {ref: 1, word: "officeboy"},
        {ref: 2, word: "coworker"},
        {ref: 3, word: "boss"},
        {ref: 4, word: "secretary"},
        {ref: 5, word: "trainee"},
    ],
    builder: [
        {res: "o", start: true, words: [1]},
        {res: "f", words: [1]},
        {res: "f", words: [1]},
        {res: "i", words: [1]},
        {res: "c", words: [2, 1], start: true},
        {res: "e", words: [1]},
        {res: "$space"},
        {res: "b", words: [1]},
        {res: "o", words: [1]},
        {res: "y", words: [1]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "o", words: [2]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "b", words: [3], start: true},
        {res: null},
        {res: null},
        {res: "w", words: [2]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "o", words: [3]},
        {res: null},
        {res: null},
        {res: "o", words: [2]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "s", words: [4,3], start: true},
        {res: "e", words: [4]},
        {res: "c", words: [4]},
        {res: "r", words: [4,2]},
        {res: "e", words: [4]},
        {res: "t", words: [4]},
        {res: "a", words: [4]},
        {res: "r", words: [4]},
        {res: "y", words: [4]},
        {res: null},
        {res: "s", words: [3]},
        {res: null},
        {res: null},
        {res: "k", words: [2]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "e", words: [2]},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: null},
        {res: "t", words: [5], start: true},
        {res: "r", words: [5,2]},
        {res: "a", words: [5]},
        {res: "i", words: [5]},
        {res: "n", words: [5]},
        {res: "e", words: [5]},
        {res: "e", words: [5]},
    ]
}

const Card = (props: {res: null | string, start: boolean | undefined, words: number[] | undefined, onCorrect: (d: number[]) => void, finish: boolean}) => {
    const [correct, setcorrect] = useState(false)

    if(props.res === null)
        return <span className="w-[10%] bg-slate-100 aspect-square"/>

    if(props.res && props.res.includes("$space")) 
        return <span className="w-[10%] bg-slate-200 aspect-square"/>


    return(
        <span className={`w-[10%] ${props.finish ? "bg-[#00CC2D] border-[#00CC2D] text-white" : "bg-slate-50"}  border-[1px] flex aspect-square relative`}>
            {
                props.start &&
                    <span className=" absolute text-xs text-slate-700  select-none w-4 flex items-center justify-center h-4">{props.words && props.words[0]}</span>
            }
            <input
                disabled={correct}
            onChange={(e) => {
                if(e.currentTarget.value.toLocaleLowerCase() === props.res?.toLocaleLowerCase()){ 
                    setcorrect(true)

                    if(!props.words) return;
                    props.onCorrect(props.words)
                }

                e.currentTarget.value = e.currentTarget.value.toUpperCase()
            }} className={`w-full font-sora font-semibold ${props.finish ? "text-white": "text-slate-600 "} text-center outline-[#00CC2D] focus:bg-[#00CC2D30] focus:text-green-700`} maxLength={1}/>
        </span>
    )
}

export const WordCruzed = (props: {onResult: (points: number) => void}) => {
    const [responses, setresponses] = useState<number[]>([])
    const [completed, setcompleteds] = useState<number[]>([])


    const handleCorrect = (words: number[]) => setresponses([...responses, ...words]);

    useEffect(() => {
        const words = data.words;


        for(let word of words){
            const corrects = responses.filter(a => a === word.ref);

            const isCompleted = completed.find(a => a === word.ref)

            if(word.word.length === corrects.length && !isCompleted){
                setcompleteds([...completed, word.ref])
            }
        }

    }, [responses])


    useEffect(() => {
        if(completed.length === data.words.length){
            props.onResult(800)
        }

        
    }, [completed])
    

    return(
        <div className="w-full h-full flex items-center gap-7 max-sm:flex-col max-sm:py-4">
            <h4><span className="font-semibold text-slate-700">Responda a palavra cruzada.</span></h4>

            <div className="flex flex-wrap shrink-0 w-full max-w-[380px] bg-slate-100 p-4 rounded-md">
                {
                    data.builder.map((word, index) => {

                        const verify = word.words?.find(a => completed.includes(a));

                        return(
                            <Card 
                            onCorrect={handleCorrect} 
                            finish={!!word.words?.find(a => completed.includes(a))}
                            key={index} 
                            res={word.res} 
                            start={word.start}
                            words={word.words}/>
                        )
                    })
                }
            </div>
            <div className="w-full flex flex-col h-full gap-6 py-4">
                <div>
                    
                    <span className="font-semibold text-slate-700">Horizontal</span>
                    <ul className="flex flex-col gap-3 mt-2">
                        <li className="text-slate-500 text-xs">
                            <span className="px-1  mr-2 py-[.15rem] bg-slate-100 font-semibold text-slate-600">1</span>
                            A young man who works in an office doing simple tasks
                        </li>
                        <li className="text-slate-500 text-xs">
                            <span className="px-1  mr-2 py-[.15rem] bg-slate-100 font-semibold text-slate-600">4</span>
                            Someone who works in an office, writing letters, making phone calls, and arranging meetings for a person or for an organization
                        </li>

                        <li className="text-slate-500 text-xs">
                            <span className="px-1  mr-2 py-[.15rem] bg-slate-100 font-semibold text-slate-600">5</span>
                            A person who is learning and practising the skills of a particular job
                        </li>
                    </ul>
                </div>
                <div>
                    <span className="font-semibold text-slate-700">Vertical</span>
                    <ul className="flex flex-col gap-3 mt-2">
                        <li className="text-slate-500 text-xs">
                            <span className="px-1  mr-2 py-[.15rem] bg-slate-100 font-semibold text-slate-600">2</span>
                            A person who you work with, especially someone with a similar job or level of responsibility
                        </li>

                        <li className="text-slate-500 text-xs">
                            <span className="px-1  mr-2 py-[.15rem] bg-slate-100 font-semibold text-slate-600">3</span>
                            The person who is in charge of an organization and who tells others what to do
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}