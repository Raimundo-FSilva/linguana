import {RevisaoCard} from "../components/RevisaoCard";
import {useState} from "react";

export const Revisao1 = () => {
  const [speechSelected, setSpeechSelected] = useState(0);

  const speechButtons = ["Speech Reported", "Speech Direct"]

  const speech = [
    [
      {title: "Present Simple", en: "He said (that) he liked my new car", pt: "Ele disse que gostou do meu carro novo."},
      {title: "Present Continuos", en: "She said (that) she was getting married", pt: "Ela disse que vai se casar."},
      {title: "Present Perfect", en: "He said (that) They had bought the tickets.", pt: "Ele disse que eles tinham comprado os tickets."},
      {title: "Past Simple", en: "He said (that) He had missed the train.", pt: "Ele disse que tinha perdido o trem."},
      {title: "Will", en: "He said (that) He would see me later.", pt: "Ele disse que ele me veria mais tarde."},
      {title: "Am/Is/Are Going to", en: "He said he was going to a class.", pt: "Ele disse que ele estava indo se juntar a turma."},
    ],
    [
      {title: "Present Simple", en: "I like your new car.", pt: "Eu gosto do seu novo carro."},
      {title: "Present Continuos", en: "I am getting married.", pt: "Eu vou me casar."},
      {title: "Present Perfect", en: "We have bought the tickets.", pt: "Nós temos comprado os Ingressos."},
      {title: "Past Simple", en: " I missed the train.", pt: "Eu perdi o trem."},
      {title: "Will", en: "I will see you later.", pt: "Eu verei você mais tarde."},
      {title: "Am/Is/Are Going to", en: "I am going to join the class.", pt: "Eu estou indo me juntar a turma."},
    ]
  ]

  return (
    <RevisaoCard path="/desafio?ref=0">
      <article className={"flex relative flex-col min-h-0 overflow-auto card-revision-scrollbar items-center max-sm:py-4 py-10"}>

        <section className={"flex flex-col items-center gap-6 max-w-[90%] md:max-w-[70%] relative"}>
          <h2 className={"text-3xl max-sm:text-2xl font-semibold text-[#171A19] font-sora"}>If condicional</h2>

          <img
            src={"/assets/images/conditional.png"}
            title={"Tabela de consulta"}
            className={"select-none"}
            draggable={false}
            alt={"If condicional tabela"}/>

          <img
            className={"absolute w-[100px] max-sm:hidden bottom-0 -right-16 select-none"}
            draggable={false}
            src={"/assets/images/woman-presenting.png"}
            alt={"Element"}/>

        </section>

        <section className={"flex flex-col items-center gap-4 max-w-[90%] md:max-w-[70%] relative mt-20 max-sm:mt-12"}>
          <h2 className={"text-3xl max-sm:text-2xl font-semibold text-[#171A19] font-sora text-center"}>Active voice x Passive voice</h2>
          <span className={"text-center max-sm:text-sm font-sora text-[#505957]"}>Enquanto a active voice destaca quem faz a ação, a passive voice foca na ação em si.</span>

          <img
            className={"w-[75%] max-sm:w-full mt-8 select-none"}
            draggable={false}
            src={"/assets/images/passive-active-voice.png"}
            alt={"Element"}/>
        </section>

        <section className={"w-full md:w-[80%] flex flex-col items-center gap-8 mt-20 max-sm:mt-12"}>

          <h2 className={"text-3xl font-semibold max-sm:text-2xl text-[#171A19] text-center font-sora"}>Reported Speech & Direct Speech</h2>

          <div className={"w-full flex gap-8"}>
            <img
              className={"h-[60%] max-h-[400px] hidden xl:block select-none shrink-0 self-end"}
              draggable={false}
              src={"/assets/images/man-presenting.png"}
              alt={"Element"}/>

            <div className={"w-full"}>
              <div className={"flex gap-4"}>
                {
                  speechButtons.map((placeholder, key) =>
                    <button
                      onClick={() => setSpeechSelected(key)}
                      title={key === speechSelected ? "Você já esta neste menu." : "Clique para mudar."}
                      className={`px-3 h-10 transition-all rounded-[6px] max-sm:px-1 max-sm:text-sm max-sm:w-2/4 font-poppins font-semibold hover:scale-95 ${key === speechSelected && "text-white" || "text-[#6C8071]"} ${key === speechSelected && "bg-[#00CC2D]" || "bg-[#D0FFDA]"}`}
                      key={key}>
                      {placeholder}
                    </button>
                  )
                }
              </div>
              <ul className={"flex flex-col gap-3 mt-5"}>
                {
                  speech[speechSelected].map((speech, key) =>
                    <li className={"bg-[#F5F5F5] h-[74px] max-sm:h-[80px] rounded-[.5rem] px-4 max-sm:px-2 flex flex-col justify-center"}>
                    <span className={"font-poppins text-sm max-sm:text-xs text-[#505957]"}>
                      <span className={"text-[#00CC2D] font-bold"}>{speech.title}</span> - {speech.en}<br/> ({speech.pt})
                    </span>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </section>

      </article>
    </RevisaoCard>
  );
};

export default Revisao1;