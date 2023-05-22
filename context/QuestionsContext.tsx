import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import useQuestions, {IQuestionResponse} from "../hooks/useQuestions";

interface IQuestionContext {
    currentQuestion: number
    loading: boolean
    validationCompleted: boolean
    points: number
    corrects: number
    incorrects: number
    timer: number
    handleJump: () => void
    handleNextQuestion: () => void
    handleSaveResponse: (points: number) => void
    responses: IQuestionResponse[]

    descriptionQuest: string
    questions: any[] | null
    setdesafio: Dispatch<SetStateAction<null>>
    setDescriptionQuest: (data: string) => void
}

// @ts-ignore
export const questionsContext = createContext<IQuestionContext>(null)

export default function QuestionsContextProvider({children} : { children: ReactNode}) {
    const { currentQuestion, handleNextQuestion, questions, setdesafio,handleJump, validationCompleted, timer, loading, handleSaveResponse, responses, descriptionQuest, setDescriptionQuest, corrects, incorrects, points } = useQuestions();


    const values: IQuestionContext = {
        currentQuestion,
        setdesafio,
        questions,
        handleNextQuestion,
        handleSaveResponse,
        handleJump,
        validationCompleted,
        loading,
        descriptionQuest,
        setDescriptionQuest,
        responses,
        corrects,
        incorrects,
        points,
        timer,
    }

    return (
        <questionsContext.Provider value={values}>
            {children}
        </questionsContext.Provider>
    );
} 