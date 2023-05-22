import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import { questionsContext } from '../context/QuestionsContext';

type Props = {
  onResult: (points: number) => void
};



export const QuestionFlags = (props: Props) => {
  const [points, setpoints] = useState(0)
  const [page, setpage] = useState(0)



  const images = [
    "nation-coat-of-arms.png",
    "brazil-flag.png",
    "national-seal.png",
    "national-anthem.jpeg"
  ]

  const words = [
    {label: "Brazil’s flag", ref: 1},
    {label: "National Anthem", ref: 3},
    {label: "National coat of arms", ref: 0},
    {label: "National seal", ref: 2},
  ]



  const handleResponde = (value: number) => {
    if(page === images.length) return toast.warn("Você já respondeu todas as questões!")
    console.log(value)
    console.log(page)
    if(value === page) setpoints(points+140)

    setpage(page+1)
  }

  const refScroll = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = refScroll.current;
    if(!element) return;

    element.scrollTo({top: element.clientHeight*page+1, behavior: 'smooth'})

  }, [page])


  useEffect(() => {
    if(page === images.length) props.onResult(points)
  }, [page])



  const context = useContext(questionsContext)

  useEffect(() => {
      context.setDescriptionQuest("Clique na palavra que corresponde a respectivas imagem")
  })

  return (
    <div className={"flex flex-col max-sm:items-center py-4 gap-10 items-center h-full max-w-[600px] mx-auto"}>
      <div className='bg-slate-100 border-[1px] relative border-slate-200 px-6 py-4 rounded-md shadow-lg'>
       
        {
          page === images.length &&
            <span className='bg-green-500 absolute left-2  top-2 text-sm text-white px-3 py-1 rounded-md border-[1px] border-green-700 select-none'>
              Concluido
            </span>
        }
        <div ref={refScroll} className='h-24 flex flex-col overflow-hidden'>
          {
            images.map((image, index) => 
              <div className='flex justify-center'>
                <img height={40} className="h-24" src={'/assets/'+image}/>
              </div>
            )
          }
        </div>
      </div>

      <ul className='w-full max-w-md flex flex-col gap-1'>
        {
          words.map((word, index) =>
            <li key={index} onClick={() => handleResponde(word.ref)} className="text-center text-slate-700 select-none cursor-pointer hover:scale-95 transition-all bg-slate-50 text-sm border-[1px] rounded-sm  w-full py-2">
              {word.label}
            </li>
          )
        }
      </ul>
      
    </div>
  );
};