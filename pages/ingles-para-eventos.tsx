import React from "react";
import {RevisaoCard} from "../components/RevisaoCard";

export const Revisao1 = () => {

  return (
    <RevisaoCard path="/desafio?ref=1">
      <article className={"flex relative flex-col min-h-0 overflow-auto card-revision-scrollbar items-center max-sm:py-4 py-10"}>

        <section className={"flex flex-col md:max-w-[80%] items-center"}>
          <h2 className={"font-sora max-sm:text-2xl text-3xl text-[#171A19] font-semibold text-center"}>Inglês para eventos e vocabulário para secretariado.</h2>
          <p className={"font-sora max-sm:text-sm text-[#505957] text-center mt-4 max-sm:mt-2"}>Nesta sessão vamos explorar um pouco mais sobre a Língua Inglesa aplicada ao vocabulário para o Técnico em Secretariado.</p>

          <div className={"flex flex-col max-w-[600px] items-center gap-4 mt-10 bg-slate-100 px-10 py-10 rounded-sm"}>
            <span className={"font-poppins font-bold text-[#00D930] select-none"}>Vocabulary</span>
            <img
              draggable={false}
              src={"/assets/images/table-vocabulary.png"}
              alt={"Vocabulary for events"}/>
          </div>

        </section>

        <section className={"flex flex-col items-end md:max-w-[80%] mt-20"}>
          <h2 className={"font-sora text-3xl text-[#171A19] max-sm:text-2xl font-semibold text-center"}>Vejamos um texto sobre a origem do Secretariado ao longo do tempo.</h2>
          <img
            className={"mt-12 max-sm:mt-8 max-sm:w-[65%] w-[45%] mx-auto select-none"}
            draggable={false}
            src={"/assets/images/secretariat.png"}
            alt={"secretariat"}/>
          <p className={"text-[#505957] indent-8 mt-12 max-sm:mt-8 max-sm:text-center text-justify"}>
            The origin of the secretariat dates back to antiquity when men developed the activity of scribes, and some slaves also carried out activities that resembled advisory services.
            In the Middle Ages, the secretaries were monks, however, in the period of mercantilism this activity was somewhat forgotten.
            There are records that Napoleon Bonaparte had a female secretary, who was in charge of making war notes, however, Josephine, Napoleon's wife, forced him to hire a man for this position.
            It was only in the period of the World Wars that women gained space in the labor market, due to the lack of male labor. And just as the world evolved, new needs were created, and so did the secretariat.
            Currently, the Secretariat involves various activities such as advising companies/entrepreneurs, organizations and institutions, planning, control of files, and correspondence management, organization and management of events, monitoring of meetings, among many others.</p>
          <a
            target={"_blank"}
            rel={"noreferrer"}
            href={"https://www.asp-secretarias.pt/2020/10/07/secretariado-origem-e-historia-ao-longo-do-tempo/"}
            title={"Ir para fonte."}
            className={"underline max-sm:text-center max-sm:w-full underline-offset-2 mt-6 text-[#0046CD] cursor-pointer"}>Adaptado de</a>
        </section>

        <section className={"flex flex-col items-end max-sm:items-start md:max-w-[80%] max-sm:mt-10 mt-20"}>
          <img
            height={"200px"}
            className={"mt-12 mx-auto select-none"}
            draggable={false}
            src={"/assets/images/grece.png"}
            alt={"secretariat"}/>
          <h2 className={"font-sora mt-10 text-3xl text-[#171A19] font-semibold text-center w-full"}>A Origem dos eventos</h2>
          <p className={"mt-6 text-[#505957] text-justify indent-8"}><span className={"font-bold text-[#00D930] text-justify"}>Did you know?</span> That the first events were the Olympic Games of the Ancient Era, dated to 776 BC. What Happened at Olympia in Greece? That from these events the spirit of hospitality developed? It is concluded that the events had their origins in the past, but have been perpetuated to the present day as they represent an effective way of integrating people and cultures.<br/><br/>

            It's in Brazil? When were the first events held?
            “In Brazil, the holding of events predates the arrival of the Royal Family. According to records from the Ministry of Industry and Commerce, some fairs were held that had characteristics similar to those that took place in the Middle Ages, that is, they took place in open spaces, where traders set up their stalls to sell their products”. (MATIAS 2001:10).
          </p>
          
        </section>
      </article>
    </RevisaoCard>
  );
};

export default Revisao1;
