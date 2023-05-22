import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { CircleNotch, Trophy } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface IResult {
    points: number,
    time: number,
    aluno: {
        nome: string,
        turma: string
        avatar: number
    }
}

const Finish = () => {
    const router = useRouter()

    const [loading, setloading] = useState(false)
    const [result, setresult] = useState<IResult[]>([])

    const getData = async () => {
        const desafio = router.query.ref

        console.log(desafio)

        if(!desafio) return;

        setloading(true)

        try {
            const res = await axios.get(`/api/ranking?desafio=${desafio}`)
            setresult(res.data.ranking)

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

        console.log("teste")
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

                <div className="flex gap-3  bg-[#FD9B28] px-10 py-3 rounded-md text-[#663803] items-center">
                    <Trophy
                        size={32}
                        weight="fill"/>

                    <h1 className="font-sora text-3xl font-bold">Ranking</h1>
                </div>

                <div className="w-full flex flex-col mt-10">
                    <span className="text-slate-500 uppercase font-bold text-base">TOP 3</span>

                    <div className="flex w-full gap-6 bg-slate-100 border-[1px] border-slate-200 rounded-md px-3 py-4 mt-2">
                        <ul className="flex flex-col gap-6 w-full">
                            
                            {

                                result.length > 0 ?
                                result.map((first, index) => 
                                <li key={index} className="flex justify-between w-full items-center relative">
                                    <span className="absolute bg-orange-500 font-poppins text-xs h-6 select-none w-6 flex items-center justify-center font-bold text-white -top-2 -left-2 rounded-full">
                                        {index+1}°
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-200 w-14 flex items-center justify-center rounded-full h-14">
                                            <img alt="" draggable={false} width={24} src={`/assets/avatars/${first.aluno.avatar+1}.png`}/>
                                        </div> 
                                        <div className="flex flex-col font-sora text-sm">
                                            <span className="text-slate-800">{first.aluno.nome}</span>
                                            <span className="text-slate-500">Turma {first.aluno.turma}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 font-sora select-none">
                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-500 uppercase text-xs font-medium">time</span>
                                            <span className="font-medium text-slate-700">{Math.floor(first.time/60).toString().padStart(2, "0")}:{(first.time-(Math.floor(first.time/60) *60)).toString().padStart(2, "0")}</span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-500 uppercase text-xs font-medium">pt</span>
                                            <span className="font-bold text-[#FD9B28]">{first.points}</span>
                                        </div>
                                    </div>
                                </li>
                                )

                                :
                                <div className="py-4 flex flex-col items-center ">
                                    <span className="text-xl font-sora font-semibold text-slate-700">Sem competidores</span>
                                    <span className="text-center text-sm mt-1 text-slate-500">Infelizmente ainda não temos compentidores para esse desafio.</span>
                                </div>
                            }
                            


                        </ul>
                    </div>
                </div>
                <Link href={"/revisoes"}>
                    <button className="bg-[#FD9B28] w-full h-14 text-[#663803] border-2 border-[#e78c24] font-sora uppercase font-medium rounded-lg mt-10">
                        Mais desafios
                    </button>
                </Link>

            
            </div>
        </div>
    )
}

export default Finish