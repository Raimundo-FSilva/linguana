import option from "phosphor-react/src/icons/Option";
import { useContext, useEffect, useState } from "react";
import { questionsContext } from "../context/QuestionsContext";

type Props = {
  options: {text: string, index: string, points: number}[]
  responses: {content: string, index: string}[]
  onResult: (point: number) => void
};
export const QuestionsListBuild = (props: Props) => {

  const [quest, setQuest] = useState<number | null>(null)
  const [response, setResponse] = useState<number | null>(null)

  const [selecteds, setSelecteds] = useState<{response: number, quest: number}[]>([])


  const context = useContext(questionsContext)

  useEffect(() => {
    context.setDescriptionQuest("Combine os pares:")
  })

  const handleSelectResponse = (index:number) => {
    const exist = selecteds.find(selected => selected.response === index);

    if(exist) return;

    setResponse(index)
  }

  const handleSelectQuest = (index:number) => {
    const exist = selecteds.find(selected => selected.quest === index);

    if(exist) return;

    setQuest(index)
  }

  useEffect(() => {
    if(response !== null && quest !== null) {
      setSelecteds([...selecteds, {quest, response}])
      setQuest(null)
      setResponse(null)
    }

  }, [response, quest])

  useEffect(() => {
    if(selecteds.length === props.options.length){
      let points = 0

      for (const count of selecteds){
        const question = props.options[count.quest]
        const responseSeleted = props.responses[count.response]
        const response = props.responses.find(a => a.index === question.index)

        if(responseSeleted === response){
          points = points + question.points
        }

      }
      
      props.onResult && props.onResult(points)
    }
  }, [selecteds])
  
  


  return (
    <div className={"w-full h-full max-w-[600px] flex max-sm:py-10  max-sm:gap-3 gap-10 py-4 mx-auto items-center"}>

      <div className={"w-2/4 gap-6 flex flex-col"}>

        {
          props.options.map((option, key) => {
            const selected = selecteds.find(data => data.quest === key);

            return (
              <div
                onClick={() => handleSelectQuest(key)}
                className={`${selected ? "border-[1px] bg-[#00D930] bg-opacity-10 border-gray-200 text-gray-600 scale-90 opacity-50" : quest === key ? "bg-[#00CC2D] text-white" : "bg-[#FAFAFA] border-[1px] border-[#00D930] text-gray-600 hover:scale-95 "}  cursor-pointer transition-all px-3 py-4 h-14 max-sm:h-16 max-sm:text-xs justify-center items-center rounded select-none flex flex-wrap`}
                key={key}>
                  <span className="shrink-0 max-w-full font-sora">
                    {option.text.replace("$data", " ____")}
                  </span>
              </div>
            )
          }
            
          )
        }
      </div>

      <div className={"w-2/4 gap-6 flex flex-col"}>
      {
          props.responses.map((data, key) => {
            const selected = selecteds.find(data => data.response === key);

            return(
              <div
                onClick={() => handleSelectResponse(key)}
                className={`${selected ? "border-[1px] border-gray-200 text-gray-600 bg-[#00D930] scale-90 bg-opacity-10 opacity-50" : response === key ? "bg-[#00CC2D] text-white" : "bg-[#FAFAFA] border-[1px] border-[#00D930] text-gray-600 hover:scale-95 "}   cursor-pointer transition-all px-3 py-4 h-14 border-[1px] max-sm:h-16 max-sm:text-xs  items-center justify-center rounded select-none flex flex-wrap`}
                key={key}>
                <span className="shrink-0 max-w-full font-sora">
                  {data.content}
                </span>
              </div>
            )
          }
          )
        }
      </div>

    </div>
  );
};