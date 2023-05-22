import Link from "next/link";
import {CaretDown, CaretLeft} from "phosphor-react";
import {ReactNode, useEffect, useState} from "react";

export const RevisaoCard = ({children, path}: {children: ReactNode, path: string}) => {
  const [activeInfoScroll, setActiveInfoScroll] = useState(true);

  useEffect(() => {
    setTimeout(() => setActiveInfoScroll(false), 4000)
  }, []);


  return (
    <div className={"bg-[#00D930] h-screen py-16 max-sm:px-5 max-sm:py-10 px-10 flex"}>

      <div className={"bg-white  mx-auto flex h-full w-full flex-col max-w-[900px] p-12 max-sm:px-6 max-sm:py-8 pb-9 rounded-[1rem]"}>

        <div className={"flex items-center gap-3 w-full border-b-2  border-[#E6E6E6] pb-3"}>
          <Link href={"/revisoes"}>
            <button className={"hover:scale-90 transition-all w-8 h-8 flex items-center justify-center text-white rounded-[.5rem] bg-[#00CC2D]"}>
              <CaretLeft size={20} weight={"bold"}/>
            </button>
          </Link>

          <h1 className={"font-sora max-sm:text-2xl text-3xl font-semibold text-[#00CC2D] select-none"}>
            Revisão
          </h1>
        </div>


        <div className={"min-h-0 h-full flex flex-col overflow-hidden relative my-4"}>


          {
            activeInfoScroll &&
              <div className={"bg-[#00D930] text-white rounded-full flex items-center justify-center absolute animate-bounce max-sm:left-0 z-10 w-10 left-8 bottom-3 h-10  mx-auto"}>
                  <CaretDown weight={"bold"} size={20}/>
              </div>
          }


          {children}

        </div>



        <div className={"flex justify-end border-t-2  border-[#E6E6E6] "}>
          <Link href={path}>
            <button className={"bg-[#00CC2D] max-sm:text-base max-sm:font-sora max-sm:h-12 max-sm:w-full hover:scale-95 transition-all text-sm font-sora rounded px-4 h-10 text-white mt-4"}>
              Começar o desafio
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};