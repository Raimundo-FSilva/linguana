import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { CircleNotch, Trophy } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface IResult {
    result: {
        id: string,
        desafio: number,
        points: number,
        time: number,
        correct: number,
        incorrect: number,
    },
    poss: number
}

const Finish = () => {
    const router = useRouter()

    const [loading, setloading] = useState(false)
    const [result, setresult] = useState<IResult | null>(null)

    const getData = async () => {
        const id = router.query.ref

        if(result) return;
        if(!id) return;

        setloading(true)

        try {
            const res = await axios.get(`/api/result?id=${id}`)
            setresult(res.data)

        } catch(err: any) {
            let error = "Ocorreu um erro durante sua requisição."

            if(err.response.data.erro)
                error = err.response.data.error

            toast.error(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        getData().then()
    }, [router.query.ref])


    if(loading)
    return(
        <div className="bg-[#00D930] h-screen flex justify-center py-14">
            <div className="bg-white w-[700px] px-20 rounded-xl h-full max-h-[1200px] flex flex-col justify-center items-center pt-20 pb-12">
                <CircleNotch color="#48B224" className="animate-spin" size={40}/>
            </div>
        </div>
    )


    return(
        <div className="bg-[#00D930] min-h-screen flex justify-center py-14 max-sm:px-6">
            <div className="bg-white w-[700px] px-20  max-sm:px-10 max-sm:pt-12 max-sm:pb-8 rounded-xl h-full max-h-[1200px] flex flex-col justify-between items-center pt-20 pb-12">

                <div className="flex items-center flex-col">
                    <img alt="finish image" width={200} draggable={false} className={"select-none"} src={"/assets/finish.png"}/>
                    <span className="text-xl font-sora text-[#1F262090] mt-6 max-sm:text-center">Parabéns, você ficou em <span className="font-bold text-[#0CB231]">{result?.poss}°</span> lugar.</span>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-[#1F262080] uppercase font-bold text-sm">Placar</span>
                    <div className="flex w-full gap-6">
                        <span className="bg-[#B20C0C10] select-none px-3 py-2 text-2xl font-sora font-bold text-[#B20C0C] w-2/4">{result?.result.incorrect}</span>
                        <span className="bg-[#0CB23110] select-none px-3 py-2 text-2xl font-sora font-bold text-[#0CB231] w-2/4">{result?.result.correct}</span>
                    </div>
                </div>

                <div className="w-full flex mt-14 flex-col gap-6">
                    <div className="w-full flex justify-between pb-2 border-b-[1px]">

                        <div className="flex flex-col font-sora gap-1">
                            <span className="text-[#1F262080] uppercase font-semibold text-sm">Tempo</span>
                            <span className="text-3xl font-semibold text-[#1F2620]">{result?.result ? Math.floor(result.result.time/60).toString().padStart(2, "0") : "00"}:{result?.result ? (result.result.time-(Math.floor(result.result.time/60) *60)).toString().padStart(2, "0") : "00"}</span>
                        </div>

                        <div className="flex flex-col font-sora gap-1 items-end">
                            <span className="text-[#1F262080] uppercase font-semibold text-sm">Pontuação</span>
                            <span className="text-3xl font-semibold text-[#FD9B28]">{result?.result.points  }</span>
                        </div>

                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href={"/ranking?ref="+result?.result.desafio}>
                            <button className="flex gap-3 w-full text-[#663803] font-sora font-semibold hover:scale-95 transition-all justify-center items-center h-14 rounded-md bg-[#FD9B28]">
                                <Trophy size={24} weight={"fill"}/>
                                Ranking
                            </button>
                        </Link>


                        <Link href={"/revisoes"}>
                            <button className="flex gap-3 w-full text-gray-700 font-sora text-sm hover:scale-95 transition-all justify-center items-center h-10 rounded-md bg-gray-100 border-[1px]">
                                Mais desafios
                            </button>
                        </Link>
                    </div>
                    
                   
                </div>
            </div>
        </div>
    )
}

export default Finish