import { Aperture, ArrowLeft, Plus } from "phosphor-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Select } from "../Select";

export function RegisterQuestion(){
    const refOption = useRef<HTMLInputElement>(null)
    const [options, setoptions] = useState<string[]>([])
    const [responseSelected, setresponseSelected] = useState<number | null>(null)
    const [image, setimage] = useState()

    const [content, setcontent] = useState("")

    function handleAddOption(){
        const element = refOption.current

        if(!element) return;
        if(!element.value) return toast.warn("Você precisa preencher o input.");

        const exist = options.find(a => a === element.value)

        if(exist) return toast.warn("Você já cadastrou esta opção")


        setoptions([...options, element.value])
        refOption.current.value = ""

    };

    return(
        <div className="w-full h-full flex flex-col">
            <header className="bg-slate-100 border-[1px] px-4 py-6 flex items-center gap-4">
                <button className="bg-slate-200 text-slate-600 w-8 h-8 rounded-lg flex items-center  justify-center ">
                    <ArrowLeft weight="bold"/>
                </button>
                <h2 className="text-slate-600 text-lg">Cadastrar nova questão</h2>
            </header>

            <div className="flex mt-4 gap-10 h-full">
                <div className="bg-slate-100 border-[1px] flex gap-3 flex-col px-4 py-4 w-2/4">
                    <label className="flex flex-col gap-1">
                        <span className="text-slate-800">Imagem</span>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                             type="file" 
                             className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#00D93020] file:text-[#00D930]
                            hover:file:bg-[#00D93040]
                            "/>
                        </label>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-slate-800">Tipo</span>
                        <Select placeholder={"Questões"} options={[
                            {label: "Selecione a correta.", value: "0"},
                            {label: "Complete a frase.", value: "1"},
                            {label: "Junte os pares.", value: "2"},
                        ]}/>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-slate-800">Dificuldade</span>
                        <Select placeholder={""} options={[
                            {label: "Fácil + 100PT", value: "0"},
                            {label: "Média + 140PT", value: "1"},
                            {label: "Difícil + 160PT", value: "2"},
                        ]}/>
                    </label>
                    
                    <label className="flex flex-col gap-1">
                        <span className="text-slate-800">Enunciado</span>
                        <input className="border-[1px] h-10 px-3 text-slate-700  outline-none transition-all  focus:border-[#00D930] focus:shadow-[0_0_0_3px_#00D93020]"/>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-slate-800">Conteudo</span>
                        <input value={content} onChange={e => setcontent(e.target.value)} className="border-[1px] h-10 px-3 text-slate-700  outline-none transition-all  focus:border-[#00D930] focus:shadow-[0_0_0_3px_#00D93020]"/>
                    </label>
                    
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col">
                            <span className="text-slate-800">Adicone opções</span>
                            <div className="mt-1 w-full flex gap-3">
                                <input ref={refOption} placeholder="Opção" className="border-[1px] w-full h-10 px-3 text-slate-700  outline-none transition-all  focus:border-[#00D930] focus:shadow-[0_0_0_3px_#00D93020]"/>
                                <button 
                                    onClick={handleAddOption}
                                    className="bg-[#00D930] rounded-md text-white flex items-center justify-center shrink-0 h-10 w-10">
                                    <Plus weight="bold" size={20}/>
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-3">
                            <span className="text-slate-800">Selecione a opção correta</span>
                            
                            <ul className="mt-3 flex gap-2 bg-slate-50 h-10 items-center px-2">
                                {
                                    options.map((opt, index) =>
                                        <li
                                            key={index} 
                                            onClick={() => setresponseSelected(index)}
                                            className={`select-none cursor-pointer hover:scale-95 transition-all px-2 py-1 text-sm  rounded-sm border border-slate-300 ${index === responseSelected ? "bg-[#00D930] text-white": "bg-slate-200 text-slate-600"}`}>{opt}</li>
                                    )
                                }
                            </ul>   
                        </div>
                        
                    </div>
                </div>  

                <div className="h-full flex flex-col justify-between items-end w-2/4">
                    <div className="bg-slate-100 w-full border-[1px] items-center flex gap-3 gap-10 px-4 py-4">
                        <img width={120} src="/assets/quests/quest_1_1.png"/>
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl">{content || "Escreva o conteúdo"}</span>
                            <ul className="flex gap-2">
                                    {
                                        
                                        options.length > 0 ?
                                        options.map((option, index) => 
                                            <li className="px-2 hover:scale-95 cursor-pointer transition-all text-sm py-1 rounded-xs bg-slate-200 text-slate-800" key={index}>
                                                {option}
                                            </li>
                                        )
                                        : 
                                        <li className="px-2 hover:scale-95 cursor-pointer transition-all text-sm py-1 rounded-xs bg-slate-200 text-slate-800">
                                            Adicione opções
                                        </li>
                                    }
                                    
                              
                            </ul>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-slate-100 h-10 px-4 text-slate-500 rounded-sm">
                            Cancelar
                        </button>
                        <button className="bg-[#00D930] h-10 px-4 text-white rounded-sm">
                            Cadastrar
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}