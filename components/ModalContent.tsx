import { X } from "phosphor-react";
import React, { useState } from "react";

import {ModalEGYP} from "../components/Modals/ModalEGYP"
import { Vocabulary } from "./Modals/Vocabulary";


const Content = (props: {type: string}) => {

    if(props.type === "VOC")
    return <Vocabulary/>
    if(props.type === "EGYP")
    return(<ModalEGYP/>)


    return null
}

export const ModalContent = (props: {label: string, type: string}) => {

    const [open, setopen] = useState(false)

    return (
        <>
            <button onClick={() => setopen(true)} className="w-full bg-gray-100 px-3 py-2 font-sora text-gray-600 border-[1px] border-green-400 rounded-md font-medium hover:scale-95 transition-all">
                {props.label}
            </button>

            {
                open &&
                <div className="bg-gray-700 bg-opacity-80 py-14 flex items-center justify-center backdrop-blur-sm absolute w-full left-0 top-0 h-full z-20">
                    <div className="bg-white w-2/4 h-full px-10 flex flex-col py-6 border-2 rounded-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-poppins text-slate-700">{props.label}</span>
                            <button onClick={() => setopen(false)} className=" w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-700 rounded-sm">
                                <X weight="bold"/>
                            </button>
                        </div>
                        <div className="h-full mt-6 min-h-0 overflow-auto">
                            <Content type={props.type}/>
                        </div>
                    </div>
                </div>
            }
            
        </>
    );
}
