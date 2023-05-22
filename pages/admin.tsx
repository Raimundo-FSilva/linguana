import { User } from "phosphor-react";
import React, { useState } from "react";
import { RegisterQuestion } from "../components/Admin/RegisterQuestion"

export default function Admin(){
    const [selected, setselected] = useState(0)

    const items = [
        {label: "Questões"},
        {label: "Alunos"},
        {label: "Desafios"},
        {label: "Resultados"},
    ]

    return(
        <div className="flex h-screen gap-10 pr-10">
            <div className="bg-[#00D930] shrink-0 w-[300px] px-8 flex flex-col items-center pt-10 h-full">
                <div className="flex bg-white w-full hover:scale-95 transition-all cursor-pointer px-3 py-2 gap-3 items-center rounded-sm">
                    <div className="h-12 w-12 bg-slate-200  flex items-center justify-center rounded-full">
                        <User className="text-slate-500" size={20}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-slate-900">Mateus Rodrigues</span>
                        <span className="text-xs text-slate-500">Admin</span>
                    </div>
                   
                </div>
                <nav className="w-full">
                    <ul className="flex flex-col text-gray-100 gap-2 mt-6 w-full"  >
                        {
                            items.map((item, index) =>
                                 <li
                                    key={index}
                                    onClick={() => setselected(index)}
                                    className={`hover:text-white cursor-pointer hover:bg-[#ffffff40] transition-all py-2 px-3 rounded-sm ${selected === index ? "border-l-4" : ""}  border-white`}>{item.label}</li>
                            )
                        }
                    </ul>
                </nav>
            </div>
            <div className="flex w-full py-10">
                <RegisterQuestion/> 
            </div>
        </div>
    )
}