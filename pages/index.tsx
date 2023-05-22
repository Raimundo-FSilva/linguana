import Link from "next/link";
import Image from "next/image";
import {CaretRight} from "phosphor-react";
import {MobileMenuDrop} from "../components/MobileMenuDrop";
import {HomeHeader} from "../components/HomeHeader";

const Home = () => {

  const navigationItems = [
    {path: "#", label: "Aulas"},
    {path: "#", label: "Desafios"}
  ]


  return (
    <div className={"md:max-w-[1360px]  md:mx-auto h-screen items-center flex flex-col"}>

      <HomeHeader/>

      <div className={"w-[calc(100%-48px)] pb-10 md:pb-0 flex-col-reverse gap-8 md:gap-0 md:flex-row flex items-center mt-[15%] md:mt-0 md:h-full md:w-full md:px-20 justify-between"}>

        <div className={"flex flex-col items-start md:max-w-[55%]"}>
      
          <h1 className={"font-poppins text-[1.5rem] md:text-[2.5rem] font-medium text-[#404745]"}>
            <span className={"font-bold text-[#48B224]"}>Inglês interdisciplinar</span> para estudantes do Curso Técnico em Secretariado
          </h1>
          <span className={"text-[1rem] md:text-[1.375rem] font-poppins text-[#8A9993] mt-2"}>Aprenda inglês de forma simples e fácil...</span>
      
          <Link href={"/revisoes"}>
            <button className={"hover:scale-[.95] w-full md:w-auto flex items-center justify-between mt-8 transition-all h-14 pl-5 pr-4 bg-[#00CC2D] text-white rounded font-sora gap-4 flex items-center"}>
              Quero começar
              <CaretRight weight={"bold"} size={24}/>
            </button>
          </Link>
      
        </div>
      
        <div className={"h-[220px] md:h-full relative w-full md:w-[40%] max-w-[400px]"}>
          <Image
            draggable={false}
            src={"/assets/images/woman-in-smart-phone.png"}
            objectFit={"contain"}
            layout={"fill"}/>
        </div>
      </div>
      <div className="flex items-center py-4"> 
        <img src="/assets/prof.jpeg"  draggable={false} className="h-14 select-none"/>
        <img src="/assets/if.jpeg" draggable={false} className="h-16 select-none"/>
      </div>

    </div>
  )
}

export default Home
