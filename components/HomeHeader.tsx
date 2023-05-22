import Image from "next/image";
import Link from "next/link";
import {MobileMenuDrop} from "./MobileMenuDrop";

export const HomeHeader = () => {

  const navigationItems = [
    {path: "/revisoes", label: "Aulas"},
    {path: "/sobre", label: "Sobre"}
  ]

  return (
    <header className={"w-[calc(100%-48px)] md:w-full z-10  max-w-[1360px]  md:px-20 md:mx-auto flex justify-between items-center mt-10"}>

      <div className={"relative h-10 w-36 select-none"}>
        <Image
          draggable={false}
          src={"/assets/logoType.svg"}
          objectFit={"contain"}
          layout={"fill"}/>
      </div>

      <nav className={"hidden md:flex"}>
        <ul className={"flex gap-8"}>
          {
            navigationItems.map((item, key) =>
              <Link
                key={key}
                href={item.path}>
                <li className={"relative cursor-pointer text-[#1A1A1A] select-none font-sora before:block before:bg-[#19D342] hover:before:w-2 before:transition-all before:w-5 before:h-1 before:-bottom-1 before:absolute before:-right-2"}>
                  {item.label}
                </li>
              </Link>
            )
          }
        </ul>
      </nav>

      <MobileMenuDrop/>

    </header>
  );
};