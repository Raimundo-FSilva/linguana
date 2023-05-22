import { useContext } from "react";
import Lottie from "react-lottie";

import {QuestionSelectWord} from "./QuestionSelectWord"
import {QuestionReponseWithText} from "./QuestionResponseWithText"
import {QuestionTrueOurFalse} from "./QuestionTrueOurFalse"
import {QuestionsListBuild} from "./QuestionsListBuild"
import {QuestionBigText} from "./QuestionBigText"
import {QuestionDoubleWord} from "./QuestDoubleWord"
import {QuestionConstructText} from "./QuestConstructText"
import {QuestionDialog} from "./QuestDialog"
import {QuestionSelectCorrect} from "./QuestionSelectOption"
import {QuestionFlags} from "./QuestionFlags"
import {WordCruzed} from "./QuestWordCruzed"

import { questionsContext } from "../context/QuestionsContext";

import checkAnimations from "../public/assets/animations/check.json"


export function Questions(){
    const {currentQuestion, validationCompleted, loading, handleSaveResponse, responses, questions} = useContext(questionsContext);

   
    if(loading && !validationCompleted) return (
      <div className="h-full cursor-default max-sm:py-12 flex gap-4 flex-col items-center justify-center">
        <div>
          <Lottie style={{cursor: "default"}} isClickToPauseDisabled options={{autoplay: true, loop: true, animationData: checkAnimations}} height={120}/>
        </div>
        <span className="font-sora text-sm text-gray-600 max-sm:text-xs animate-pulse">Estamos validando suas respostas...</span>
      </div>
    );

      // @ts-ignore
    const question:any = questions[currentQuestion];

    if(!loading && validationCompleted) {
      // @ts-ignore
      const questionVerify: any = questions[currentQuestion-1]

      const correct = responses[currentQuestion-1].points > 0;

      return (
        <div className="cursor-default flex h-full flex-col items-center justify-center">
          <div className="flex border-[1px] max-sm:flex-col rounded-xl items-center gap-6 shadow-xl w-3/4 max-sm:w-full max-sm:my-10 px-8 max-sm:px-6 py-8">
            <img className="w-24 max-sm:w-16" src={`/assets/${correct ? "correct" : "incorrect"}.png`}/>

                <div className="flex flex-col justify-center w-full">

                  {
                    questionVerify.error.type === "unique" ?
                      <span className="text-2xl max-sm:text-xl max-sm:text-center font-sora font-bold text-gray-800">
                        {correct ? "Você acertou!" : "Você errou!"}
                      </span>
                      :
                      <span className="text-2xl max-sm:text-xl max-sm:text-center font-sora font-bold text-gray-800">
                        Resultado
                      </span>

                  }

                  {
                    questionVerify.error.type === "unique" && correct ? 
                      <span className="text-gray-500 max-sm:text-sm max-sm:text-center">Parabéns, você acertou a resposta!</span>
                    : 
                    questionVerify.error.type === "unique" && !correct ?
                    <>
                      <span className="text-gray-500 max-sm:text-sm max-sm:mt-0 mt-1 max-sm:text-center">A resposta correta é:</span>
                      <span className="text bg-green-100 max-sm:mt-6 max-sm:text-center border-[1px] mt-1 border-green-200 rounded-sm px-3 py-1 text-green-800">
                        {questionVerify.error.label}
                      </span>
                    </>
                    :
                    <span className="text-gray-500 max-sm:text-center">Você acertou <strong className="font-bold text-[#48B224]">{responses[currentQuestion-1].points / questionVerify.error.points}</strong> de  <strong className="font-bold text-[#48B224]">{questionVerify.error.options}</strong> questões.</span>
                  }
                 
              
                </div>
  
          </div>
  
        </div>
      );
  

    }

    if(!question) return null;

    if(question.type === "select-word") return(
      <QuestionSelectWord
        points={question.content.points}
        
        description={question.description}
        content={question.content.content}
        image={question.content.image}
        textSmall={question.content.textSmall}
        options={question.content.options}
        responses={question.content.response}
        result={(res => handleSaveResponse(res))}/>
    )

    if(question.type === "response-text") return (
      <QuestionReponseWithText
        question={question.content.question}
        points={question.content.points}
        image={question.content.image}
        response={question.content.response}
        onResult={(res => handleSaveResponse(res))}/>
    )

    if(question.type === "true-our-false") return (
      <QuestionTrueOurFalse
        falseLabel={question.content.falseLabel}
        trueLabel={question.content.trueLabel}
        image={question.content.image}
        points={question.content.points}
        response={question.content.response}
        text={question.content.question}
        onResult={(res) => handleSaveResponse(res)}/>
    )

    if(question.type === "list-build") return (
      <QuestionsListBuild 
        onResult={(res) => handleSaveResponse(res)}
        responses={question.content.response}
        options={question.content.options}/>
    )

    if(question.type === "text-analytics") return (
      <QuestionBigText
        points={question.content.points}
        refRight={question.content.ref}
        onResult={(res) => handleSaveResponse(res)}
        options={question.content.options}
        content={question.content.text}/>
    )

    if(question.type === "double-word") return (
      <QuestionDoubleWord
        points={question.content.points}
        image={question.content.image}
        onResult={(res) => handleSaveResponse(res)}
        options={question.content.options}
        content={question.content.text}/>
    )

    if(question.type === "texts-constructor") return (
      <QuestionConstructText
        onResult={(res) => handleSaveResponse(res)}
        texts={question.content.texts}
        options={question.content.options}/>
    )

    if(question.type === "dialog-complet") return (
      <QuestionDialog
        onResult={(res) => handleSaveResponse(res)}
        dialogs={question.content.messages}/>
    )

    if(question.type === "select-correct") return (
      <QuestionSelectCorrect
        onResult={(res) => handleSaveResponse(res)}
        image={question.content.image}
        options={question.content.options}
        description={question.description}
        points={question.content.points}
        question={question.content.question}
        modal={question.content.modal}/>
    )
    
    if(question.type === "flags") return (
      <QuestionFlags
        onResult={(res) => handleSaveResponse(res)}/>
    )
    if(question.type === "words-cruzed")
      return(
        <WordCruzed onResult={(res) => handleSaveResponse(res)}/>
      );    

    
    return null;
}