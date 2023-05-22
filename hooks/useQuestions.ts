import {useEffect, useReducer, useState} from "react"
import { toast } from "react-toastify"


export interface IQuestionResponse {
    index: number
    points: number
}

import desafios from "../data/questions.json";


const responseReducer = (_: any, data: IQuestionResponse[]) => data;

export default function useQuestions() {
    const [desafio, setdesafio] = useState(null)
    const [questions, setQuestions] = useState<any[] | null>(null)

    useEffect(() => {

        if(desafio !== null && desafio <= desafios.length){
            const data = <any> desafios[desafio]
            setQuestions(data)
        }
    
    }, [desafio])
    


    const [responses, setResponses] = useReducer(responseReducer, [])
    const [loading, setLoading] = useState(false)
    const [validationCompleted, setValidationCompleted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [descriptionQuest, setDescriptionQuest] = useState("")


    const [timerPause, setTimerPause] = useState(false)
    const [timer, setTimer] = useState(0)


    useEffect(() => {
        if(timerPause) return;
        setTimeout(() => setTimer(timer+1), 1000)
    }, [timer, timerPause])
    


    const [points, setPoints] = useState(0)
    const [corrects, setCorrects ]= useState(0)
    const [incorrects, setIncorrects] = useState(0)



    const handleSaveResponse = (points: number) => {
        const response = responses[currentQuestion];

        if(!response)
            return setResponses([...responses, {points, index: currentQuestion}])

        const result = responses;
        response.points = points;


        result[currentQuestion] = response;

        setResponses(result)
    }


    useEffect(() => {
        if(!validationCompleted ) return;
        const pointsCalculate = responses.map(a => a.points);

        const correctsCalculate = responses.filter(res => res.points > 0);

        setCorrects(correctsCalculate.length)
        setIncorrects(responses.filter(res => res.points === 0).length)

        if(pointsCalculate.length > 0)
            setPoints(pointsCalculate.reduce((a, b) => a + b))

    }, [validationCompleted])

    const handleJump = () => {
        const soundButton = new Audio("/assets/music/next.wav");
        soundButton.play()


        handleSaveResponse(0)

        setTimerPause(true)
        setCurrentQuestion(currentQuestion+1)

        // @ts-ignore
        const lastQuestion = currentQuestion+1 === questions.length;

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setValidationCompleted(true)
        }, lastQuestion ? 0 : 2000)
    }

    const handleNextQuestion = () => {
        const soundButton = new Audio("/assets/music/next.wav");
        soundButton.play()
        const response = responses[currentQuestion];

        if(!response && !loading && !validationCompleted) return toast.warning("Você precisa responder a questão!")

        // @ts-ignore
        const lastQuestion = currentQuestion+1 === questions.length;


        if(validationCompleted) return setValidationCompleted(false);

       
        setTimerPause(true)
        setCurrentQuestion(currentQuestion+1)

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setValidationCompleted(true)
        }, lastQuestion ? 0 : 2000)
    }

    useEffect(() => {
      if(validationCompleted) return;
      setTimerPause(false)
    }, [validationCompleted])
    

    return {
        currentQuestion,
        handleNextQuestion,
        handleSaveResponse,
        validationCompleted,
        descriptionQuest,
        setDescriptionQuest,
        setdesafio,
        questions,
        handleJump,
        loading,
        responses,
        corrects,
        incorrects,
        points,
        timer,
    }
}