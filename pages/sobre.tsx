import Link from "next/link";

function Sobre() {
    return (
        <main className="bg-[#00D930] min-h-screen py-8 flex items-center justify-center">

            <div className="bg-white max-8 max-sm:mx-8 max-sm:pt-10  pt-20 gap-8 pb-8 max px-12 max-w-[1000px] mx-auto flex flex-col rounded-2xl ">


                <div className="flex gap-10 items-center max-sm:flex-col">
                    <img className="w-[160px] max-sm:w-[96px] shrink-0" src="/assets/images/mascote.png" alt="Mascote L" />

                    <p className="font-poppins max-sm:text-sm italic font-normal text-lg text-justify text-slate-500">
                       <strong className="not-italic text-slate-800 max-sm:text-sm text-xl">Hello, eu sou Linguana</strong>, um App desenvolvido como Produto Educacional vinculado à pesquisa de mestrado intitulada “ Tecnologia Digital no ensino e aprendizagem de Língua Inglesa: Aplicativo Interdisciplinar para estudantes do curso Técnico em Secretariado do IFRR/CBV”, realizada por Guiomar Fabrício de Souza e orientação da Professora Dra. Tassiane dos Santos Ferrão, no âmbito do Programa de Pós-graduação em Educação Profissional e Tecnológica (PROFEPT), ofertado pelo Campus Boa Vista do Instituto Federal de Educação, Ciência e Tecnologia do (IFRR), no ano de 2022
                    </p>
                </div>


                <div className="flex gap-4 max-sm:justify-center justify-end">
                    <Link href={"/"}><a className="inline-block max-sm:text-sm rounded-md bg-[#00D930] hover:scale-95 transition-all text-xl font-bold font-sora px-4 py-[10px] text-white">Home</a></Link>
                    <Link href={"/revisoes"}><a className="inline-block max-sm:text-sm rounded-md hover:scale-95 transition-all bg-[#00D930] text-xl font-bold font-sora px-4 py-[10px] text-white">Desafios</a></Link>
                </div>
            </div>
        </main>
    )
}

export default Sobre;