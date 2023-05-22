import * as React from 'react';
import {Select} from "../components/Select";
import {ChangeEvent, useRef, useState} from "react";
import {Check, CircleNotch} from "phosphor-react";
import {toast} from "react-toastify";
import axios from "axios";
import { accountsContext } from '../context/AccountContext';

export const MinhaConta = () => {
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState<number | null>(null);
  const [nome, setNome] = useState<undefined | string>(undefined);
  const [matricula, setMatricula] = useState<undefined | string>(undefined);
  const [nascimento, setNascimento] = useState<undefined | string>(undefined);
  const [turma, setTurma] = useState<undefined | string>(undefined);


  const context = React.useContext(accountsContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(avatar === null || !nome || !matricula || !nascimento || !turma)
      return toast.warning("Preencha todos os campos e escolha seu avatar!");

    setLoading(true);
    await context.handleAuth({avatar, nome, matricula, nascimento, turma})
    setLoading(false)
   
  }

  const maskBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    let resolve = e.target.value.replace(/\D+/g, "");


    resolve = resolve.replace(/(\d{2})(\d)/, "$1/$2")
    resolve = resolve.replace(/(\d{2})(\d)/, "$1/$2")

    setNascimento(resolve)
    e.target.maxLength = 10;
  }

  const maskMatricula = (data: string) => {
    let resolve = data;
    resolve = resolve.toUpperCase();

    setMatricula(resolve)
  }

  const avatars = [1, 1, 1, 1, 1, 1]

  return (
    <div className={"bg-[#00D930] min-h-screen max-sm:py-10 max-sm:px-6 w-full flex items-center justify-center"}>


      <div className={"bg-white w-[1000px] max-sm:flex-col-reverse max-sm:px-6 max-sm:py-8 flex px-20 py-16 rounded-xl gap-14"}>
        <form className={"w-2/4 shrink-0 max-w-[400px] max-sm:w-full flex flex-col gap-4 items-center"}>
          <img alt={"logo"} width={140} className={"mb-4 max-sm:hidden"} src={"/assets/logoType.svg"}/>
          <input
            style={{border: "1px solid #CCCCCC"}}
            spellCheck={false}
            value={nome}
            onChange={e => setNome(e.target.value.replace(/[0-9]/g, ''))}
            placeholder={"Nome"}
            className={"bg-[#FAFAFA] w-full rounded-[4px] outline-0 h-10 font-sora text-sm px-3"}
            name={"nome"}
            type={"text"}/>


          <input
            style={{border: "1px solid #CCCCCC"}}
            spellCheck={false}
            placeholder={"Matricula"}
            value={matricula}
            maxLength={13}
            onChange={(e) => maskMatricula(e.target.value)}
            className={"bg-[#FAFAFA] w-full rounded-[4px] outline-0 h-10 font-sora text-sm px-3"}
            name={"matricula"}
            type={"text"}/>

          <input
            style={{border: "1px solid #CCCCCC"}}
            spellCheck={false}
            onChange={maskBirthday}
            value={nascimento}
            placeholder={"Data de nascimento"}
            className={"bg-[#FAFAFA] w-full rounded-[4px] outline-0 h-10 font-sora text-sm px-3"}
            name={"data de nascimento"}
            type={"text"}/>

          <Select
            options={[
              {label: "Turma 01", value: "1"},
              {label: "Turma 02", value: "2"},
            ]}
            onChange={(e) => setTurma(e)}
            placeholder={"Turma"}/>

          <button
            disabled={loading}
            onClick={(e) => handleSubmit(e).then()}
            className={"bg-[#00CC2D] w-full hover:opacity-80 flex items-center justify-center gap-2 transition-all rounded mt-6 h-10 text-white font-sora font-semibold"}>
            {loading  && <CircleNotch size={18} weight={"bold"} className={"animate-spin"}/>}
            Entrar
          </button>
        </form>


        <div className={"w-full flex flex-col justify-"}>
          <span className={"font-sora text-[#404745]"}>Escolha seu avatar:</span>
          <div className={"flex flex-wrap max-sm:gap-6 gap-3 mt-2"}>
            {
              avatars.map((_, key) =>
                <div
                  onClick={() => setAvatar(key)}
                  className={"bg-[#FAFAFA] relative hover:scale-95 transition-all  select-none flex items-center justify-center rounded-[1rem] border-2 border-[#CCCCCC] max-sm:w-[calc(50%-.75rem)] w-[calc(33.333%-.5rem)] max-sm:h-[100px] h-[130px]"}>

                  {
                    avatar === key &&
                    <span className={"absolute w-6 flex  -right-2 transition-all animate-bounce  -top-2 text-bold text-[#00B227] items-center justify-center rounded-full h-6 bg-[#CCF7D6]"}>
                        <Check size={16} weight={"bold"}/>
                    </span>
                  }

                  <img
                    alt={"avatar"}
                    draggable={false}
                    className="w-16 max-sm:w-10"
                    src={`/assets/avatars/${key+1}.png`}/>
                </div>
              )
            }
          </div>
        </div>
        <img alt={"logo"} width={180} className={"mb-0 mx-auto sm:hidden"} src={"/assets/logoType.svg"}/>

      </div>
    </div>
  );
};

export default MinhaConta;