import Link from "next/link";
import {X} from "phosphor-react";
import Image from "next/image";

const revisoes = [
  {
    title: "Tempos verbais do passado e discursos.",
    description: "Nesta seção vamos relembrar o conteúdo que estudamos no componente curricular de Língua Inglesa III.",
    link: "/tempos-verbais",
  },
  {
    title: "Inglês para eventos e vocabulário para secretariado",
    description: "Nesta seção vamos explorar um pouco mais sobre a língua inglesa aplicada ao vocabulário para o Técnico em Secretariado com ênfase nos conteúdos trabalhados na disciplina de Noções de Eventos.",
    link: "/ingles-para-eventos",
  }
]

export const Revisoes = () => {
  return (
    <div className={"bg-[#00D930] min-h-screen w-full flex items-center justify-center"}>

      <div className={"w-full max-sm:py-0 max-sm:pt-8 max-sm:pb-20 max-xl:py-20 px-20 max-sm:px-6 max-w-[1160px] flex flex-col"}>
        <div className={"sm:hidden flex items-center w-full justify-between"}>
          <div className={"relative w-[120px] h-6"}>
            <Image
              draggable={false}
              src={"/assets/logotype_white.png"}
              objectFit={"contain"}
              layout={"fill"}/>
          </div>

          <Link href={"/"}>
            <button className={" hover:scale-90 transition-all bg-white w-9 flex items-center justify-center rounded-[.5rem] h-9 text-[#48B224]"}>
              <X weight={"bold"} size={20}/>
            </button>
          </Link>
        </div>

        <div className={"flex max-sm:mt-8  items-center justify-between"}>
          <div className={"flex flex-col text-white select-none"}>
            <h1 className={"text-3xl max-sm:text-2xl font-bold font-sora"}>Relembrar</h1>
            <span className={"max-sm:text-sm text-xl opacity-90"}>Escolha um conteúdo para revisar e aplicar o teste.</span>
          </div>

          <Link href={"/"}>
            <button className={"max-sm:hidden hover:scale-90 transition-all bg-white w-10 flex items-center justify-center rounded-[.5rem] h-10 text-[#48B224]"}>
              <X weight={"bold"} size={24}/>
            </button>
          </Link>
        </div>

        <div className={"flex gap-16 max-sm:gap-8 max-xl:flex-col max-xl:items-center max-xl:gap-10 max-sm:mt-8 mt-14"}>

          {
            revisoes.map((data, key) =>

              <div
                key={key}
                style={{boxShadow: "0px 4px 42px rgba(0, 0, 0, 0.1);"}}
                className={"bg-white flex sm:hover:scale-[1.05] transition-all flex-col justify-between border-2 border-[#D9D9D9] w-2/4 max-xl:w-full px-8 pt-10 pb-8 rounded-[1rem]"}>

                <div className={"flex flex-col font-sora gap-3 "}>
                  <h2 className={"text-3xl max-sm:text-2xl font-bold text-[#48B224]"}>{data.title}</h2>
                  <p className={"text-[#505957] max-sm:text-sm"}>{data.description}</p>
                </div>

                <Link href={data.link}>
                  <button className={"hover:opacity-80 transition-all text-white h-12 bg-[#00CC2D] w-full font-sora  max-sm:text-base max-sm:h-10 text-xl font-semibold rounded max-md:mt-8 mt-12"}>
                    Revisar
                  </button>
                </Link>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Revisoes;